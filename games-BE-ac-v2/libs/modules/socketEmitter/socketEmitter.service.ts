import { Injectable, OnModuleInit } from '@nestjs/common';
import { MonitoringService } from '@provfair/monitoring';
import { InjectRedis, Redis } from '@provfair/redis';
import { SocketEvents } from '@provfair/shared/enums';
import { Emitter } from '@socket.io/redis-emitter';

@Injectable()
export class SocketIOEmitterService implements OnModuleInit {
  public emitter: Emitter;

  constructor(
    private readonly monitor: MonitoringService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  onModuleInit(): any {
    this.emitter = new Emitter(this.redis);

    this.redis.on('error', (error) => {
      this.monitor.error(`[SocketEmitterService] get error callback from redis`, {
        data: error,
      });
    });
  }

  private convertToString(ids: string | string[]) {
    if (Array.isArray(ids)) {
      ids = ids.map((r) => r.toString());
    } else {
      ids = ids.toString();
    }

    return ids;
  }

  public emit(input: { eventName: string; data: unknown; roomIds?: string | string[] }): void {
    const { eventName, data } = input;
    let { roomIds } = input;

    if (roomIds) {
      roomIds = this.convertToString(roomIds);

      this.emitter.to(roomIds).emit(eventName, data);
    } else {
      this.emitter.emit(eventName, data);
    }
  }

  public emitPlayerBalanceUpdate({ balance, playerId }: { balance: number; playerId: string }) {
    this.emit({
      roomIds: playerId,
      eventName: SocketEvents.USER_BALANCE_UPDATE,
      data: { balance, playerId },
    });
  }
}
