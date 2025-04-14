import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException, WsResponse } from '@nestjs/websockets';

@Catch(WsException)
export class WebSocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    const data = ctx.getData();

    const error = exception.getError();
    const details = error instanceof Object ? { ...error } : { message: error };

    const errorResponse: WsResponse<any> = {
      event: 'error',
      data: {
        details,
      },
    };

    client.emit(errorResponse.event, errorResponse.data);
  }
}
