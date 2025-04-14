import { Injectable } from '@nestjs/common';
import { RGSConfigService } from '@provfair/configuration/rgs';
import { MonitoringService } from '@provfair/monitoring';
import { DEFAULT_GAME_MODE } from '@provfair/shared/enums';
import { GameBeResultCodes } from '@provfair/shared/enums/gameBeResultCodes.enum';
import { HttpRequest, HttpRequestOptions, IHttpRequestOptions, IHttpResponse, MethodsEnum } from 'libs/http-request';
import { ServerError } from '../graphql/errors/server/server.error';
import { CreditInterface, DebitInterface, InitInterface } from './rgs';

@Injectable()
export default class RgsService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsConfigService: RGSConfigService,
  ) {}

  private async requestJson<Body, Response>(input: {
    httpRequestOptions: IHttpRequestOptions<Body>;
  }): Promise<IHttpResponse<Response>> {
    const { httpRequestOptions } = input;
    httpRequestOptions.addHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return HttpRequest.execute<Body, Response>(httpRequestOptions);
  }

  public async init(request: InitInterface) {
    this.monitor.info('===RGS init started===', { data: request });

    if (!request.token)
      throw new ServerError({
        context: 'rgs-init',
        code: GameBeResultCodes.RGS_ERROR_INVALID_TOKEN,
        message: 'No token passed for calling RGS init.',
      });

    const obj = {
      token: request.token,
    };

    const httpRequestOptions = new HttpRequestOptions({
      method: MethodsEnum.POST,
      url: `${this.rgsConfigService.url}/init`,
      body: obj,
    });

    const res = await this.requestJson<
      typeof obj,
      {
        userId: string;
        balance: number;
        currency: string;
        language: string;
        platformId: string;
        operatorId: string;
        brandId: string;
        gameMode?: string;
        minBet?: number;
        maxBet?: number;
        defaultBet?: number;
        maxWin?: number;
      }
    >({ httpRequestOptions });

    if (!res.success) {
      this.monitor.error('RGS init failed', { error: res.error?.response?.data ?? res.error });

      let errObj: any = { code: GameBeResultCodes.RGS_ERROR_INIT_REQUEST_FAILED };

      if (res.error?.response?.data) {
        errObj = res.error.response.data;
      }

      throw new ServerError({
        context: 'rgs-init',
        ...errObj,
      });
    }

    this.monitor.info('===RGS Init response from RGS===', { data: res.body });

    return {
      playerId: res.body?.userId,
      balance: res.body?.balance,
      currency: res.body?.currency,
      language: res.body?.language,
      gameMode: res.body?.gameMode || DEFAULT_GAME_MODE,
      operatorId: res?.body?.operatorId || '',
      minBet: res.body?.minBet,
      maxBet: res.body?.maxBet,
      defaultBet: res.body?.defaultBet,
      maxWin: res.body?.maxWin || null,
    };
  }

  public async debit(request: DebitInterface) {
    this.monitor.info('RGS debit call started with data', { data: request });

    if (!request.token)
      throw new ServerError({
        context: 'rgs-debit',
        code: GameBeResultCodes.RGS_ERROR_INVALID_TOKEN,
        message: 'No token passed for calling RGS debit.',
      });

    const obj = {
      token: request.token,
      betAmount: request.amount,
      roundId: request.roundId ?? request.betId,
      betId: request.betId,
    };

    this.monitor.info('Calling RGS bet endpoint with data', { data: obj });

    const httpRequestOptions = new HttpRequestOptions({
      method: MethodsEnum.POST,
      url: `${this.rgsConfigService.url}/bet`,
      body: obj,
    });

    const res = await this.requestJson<
      typeof obj,
      {
        balance: number;
      }
    >({ httpRequestOptions });

    if (!res.success) {
      this.monitor.error('RGS bet failed', { error: res.error?.response?.data ?? res.error });

      let errObj: any = { code: GameBeResultCodes.RGS_ERROR_BET_REQUEST_FAILED };

      if (res.error?.response?.data) {
        errObj = res.error.response.data;
      }

      throw new ServerError({
        context: 'rgs-bet',
        ...errObj,
      });
    }

    this.monitor.info('RGS bet response.', { data: { res: res.body, betId: obj.betId } });

    return res.body;
  }

  public async refund(request: DebitInterface) {
    this.monitor.info('RGS refund call started with data', { data: request });

    if (!request.token)
      throw new ServerError({
        context: 'rgs-refund',
        code: GameBeResultCodes.RGS_ERROR_INVALID_TOKEN,
        message: 'No token passed for calling RGS refund.',
      });

    const obj = {
      token: request.token,
      roundId: request.roundId,
      betId: request.betId,
    };

    const httpRequestOptions = new HttpRequestOptions({
      method: MethodsEnum.POST,
      url: `${this.rgsConfigService.url}/refund`,
      body: obj,
    });

    const res = await this.requestJson<
      typeof obj,
      {
        balance: number;
      }
    >({ httpRequestOptions });

    if (!res.success) {
      this.monitor.error('RGS refund failed', { error: res.error?.response?.data ?? res.error });

      let errObj: any = { code: GameBeResultCodes.RGS_ERROR_REFUND_REQUEST_FAILED };

      if (res.error?.response?.data) {
        errObj = res.error.response.data;
      }

      throw new ServerError({
        context: 'rgs-refund',
        ...errObj,
      });
    }

    this.monitor.info('RGS refund call response.', { data: { res: res.body, betId: obj.betId } });

    return res.body;
  }

  public async credit(request: CreditInterface[]) {
    if (!request?.length) {
      this.monitor.warn('No credit data found for making RGS credit call, data received.', { data: request });
      return [];
    }

    const obj = request.map((el) => {
      const _temp = {
        token: el.token,
        winAmount: el.winAmount,
        betId: el.betId,
        roundId: el.roundId ?? el.betId,
        clientSeed: el.clientSeed,
        serverSeed: el.serverSeed,
        hashedServerSeed: el.hashedServerSeed,
        payoutMultiplier: el.payoutMultiplier,
      };

      return _temp;
    });

    const roundId = obj[0].roundId;

    this.monitor.info(`RGS credit call started with data.`, { data: { roundId, obj } });

    const httpRequestOptions = new HttpRequestOptions({
      method: MethodsEnum.POST,
      url: `${this.rgsConfigService.url}/win`,
      body: obj,
    });

    const res = await this.requestJson<
      typeof obj,
      {
        balance: number;
        transaction_id: string;
      }[]
    >({ httpRequestOptions });

    if (!res.success) {
      this.monitor.error('RGS win failed', { error: res.error?.response?.data ?? res.error, data: { roundId } });

      let errObj: any = { code: GameBeResultCodes.RGS_ERROR_WIN_REQUEST_FAILED };

      if (res.error?.response?.data) {
        errObj = res.error.response.data;
      }

      throw new ServerError({
        context: 'rgs-win',
        ...errObj,
      });
    }

    this.monitor.info('RGS credit call ended with response.', { data: { response: res.body, roundId } });

    return res.body || [];
  }
}
