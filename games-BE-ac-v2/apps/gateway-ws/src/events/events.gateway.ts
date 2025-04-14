import { UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { FederationClient } from '@provfair/modules/federation-client';
import JWTService from '@provfair/modules/jwt/jwt.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { ValidatorService } from '@provfair/modules/validator';
import { MonitoringService } from '@provfair/monitoring';
import { RedisIoAdapter } from '@provfair/shared/adapters/socket-io-redis.adapter';
import { GameCodes, GameMode, MultiplayerGames, SocketEvents } from '@provfair/shared/enums';
import { getRoomNameByGame, getRoomNameByMode } from '@provfair/shared/helpers/getRoomName';
import { ActiveGameInput, BetPlaceInput, CancelBetInput, CashOutInput } from '@provfair/shared/inputs';
import { AuthenticatedSocket, IJoinRoom, ILeaveRoom } from '@provfair/shared/interfaces/gateway-ws';
import { ActiveBetUseCase } from '@provfair/usecases/activeBet/activeBet.usecase';
import { ActiveGameUseCase } from '@provfair/usecases/activeGame/activeGame.usecase';
import { BetPlaceUseCase } from '@provfair/usecases/betPlace/betPlace.usecase';
import { CancelBetUseCase } from '@provfair/usecases/cancelbet/cancelbet.usecase';
import { CashOutUseCase } from '@provfair/usecases/cashOut/cashOut.usecase';
import { LastMultipliersUseCase } from '@provfair/usecases/lastMultipliers/lastMultipliers.usecase';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from './webSocketExceptionFilter';

type RedisSocket = AuthenticatedSocket<RedisIoAdapter>;

@WebSocketGateway({ serveClient: true })
@UseFilters(WebSocketExceptionFilter)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server<RedisIoAdapter>;

  constructor(
    private readonly monitor: MonitoringService,
    private readonly jwtService: JWTService,
    private readonly validatorService: ValidatorService,
    private readonly federationClient: FederationClient,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {}

  private getToken(socket: Socket) {
    const { handshake } = socket;
    const token = handshake.auth?.token ?? handshake.headers?.token;

    return token;
  }

  authMiddleWare = (jwtService: JWTService, monitor: MonitoringService) => async (socket: RedisSocket, next) => {
    const token = this.getToken(socket);

    try {
      socket.request.currentUser = await jwtService.verifyJwt(token);
    } catch (error) {
      monitor.error('Error on socket JWT validate.', { error });
      return next(error);
    }

    next();
  };

  afterInit(server: Server<RedisIoAdapter>): void {
    const middleware = this.authMiddleWare(this.jwtService, this.monitor);
    server.use(middleware);
  }

  handleDisconnect(socket: RedisSocket) {
    const { gameCode } = socket.request.currentUser;

    this.leaveRoom(socket, { gameCode });
  }

  handleConnection(socket: RedisSocket): void {
    const { gameCode } = socket.request.currentUser;

    this.joinRoom(socket, null);

    if ([GameCodes.HILO, GameCodes.MINES, GameCodes.BOTTLESMASH, GameCodes.OVERANDOUT].includes(gameCode)) {
      this.activeBet(socket);
    }

    if (MultiplayerGames.includes(gameCode)) {
      this.gameStat(socket, { gameCode });
    }

    if ([GameCodes.AVIATORX, GameCodes.PCRASH, GameCodes.BUTTONPOP].includes(gameCode)) {
      this.lastMultipliers(socket);
    }
  }

  @SubscribeMessage(SocketEvents.JOIN_ROOM)
  joinRoom(@ConnectedSocket() socket: RedisSocket, @MessageBody() data: IJoinRoom): { rooms: string[] } {
    const { gameMode, playerId, gameCode } = socket.request.currentUser;

    const rooms = [getRoomNameByGame(gameCode, gameMode), playerId, getRoomNameByMode(gameMode)];

    socket.join(rooms);

    return { rooms };
  }

  @SubscribeMessage(SocketEvents.LEAVE_ROOM)
  async leaveRoom(@ConnectedSocket() socket: RedisSocket, data: ILeaveRoom): Promise<void> {
    const { gameCode } = data;
    const { gameMode, playerId } = socket.request.currentUser;

    const rooms = [getRoomNameByGame(gameCode, gameMode), playerId, getRoomNameByMode(gameMode)];

    for (const room of rooms) {
      socket.leave(room);
    }
  }

  @SubscribeMessage(SocketEvents.PLACE_BET)
  async betPlace(@ConnectedSocket() socket: RedisSocket, @MessageBody() data: BetPlaceInput) {
    try {
      // this.validatorService.validate({ key: SchemaKeys.PLACE_BET, data });

      const token = this.getToken(socket);

      const { playerId } = socket.request.currentUser;

      const betPlaceUseCase = new BetPlaceUseCase(this.federationClient, this.monitor, this.socketIOEmitterService);
      await betPlaceUseCase.run(data as any, playerId, token);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage(SocketEvents.CASH_OUT)
  async cashOut(@ConnectedSocket() socket: RedisSocket, @MessageBody() data: CashOutInput) {
    try {
      // this.validatorService.validate({ key: SchemaKeys.CASH_OUT, data });

      const token = this.getToken(socket);

      const { playerId } = socket.request.currentUser;

      const usecase = new CashOutUseCase(this.federationClient, this.monitor, this.socketIOEmitterService);
      await usecase.run(data as any, playerId, token);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage(SocketEvents.CANCEL_BET)
  async cancelBet(@ConnectedSocket() socket: RedisSocket, @MessageBody() data: CancelBetInput) {
    try {
      const token = this.getToken(socket);

      const { playerId } = socket.request.currentUser;

      const usecase = new CancelBetUseCase(this.federationClient, this.monitor, this.socketIOEmitterService);
      await usecase.run(data as any, playerId, token);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage(SocketEvents.GAME_STATS)
  async gameStat(@ConnectedSocket() socket: RedisSocket, @MessageBody() data: ActiveGameInput) {
    try {
      const token = this.getToken(socket);

      const { playerId, gameCode } = socket.request.currentUser;

      const usecase = new ActiveGameUseCase(this.federationClient, this.monitor, this.socketIOEmitterService);
      await usecase.run(data as any, playerId, token);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage(SocketEvents.LAST_MULTIPLIERS)
  async lastMultipliers(@ConnectedSocket() socket: RedisSocket, @MessageBody() data?: { gameMode: GameMode }) {
    try {
      const token = this.getToken(socket);

      const { playerId, gameCode } = socket.request.currentUser;

      const gameMode = data?.gameMode ?? socket.request.currentUser.gameMode;

      const usecase = new LastMultipliersUseCase(this.federationClient, this.monitor, this.socketIOEmitterService);
      await usecase.run(gameMode, gameCode, playerId, token);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage(SocketEvents.ACTIVE_BET)
  async activeBet(@ConnectedSocket() socket: RedisSocket) {
    try {
      const token = this.getToken(socket);

      const usecase = new ActiveBetUseCase(this.federationClient, this.monitor, this.socketIOEmitterService);
      await usecase.run({ ...socket.request.currentUser, token });
    } catch (error) {
      throw new WsException(error.message);
    }
  }
}
