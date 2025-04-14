import { AxiosError, AxiosResponse } from 'axios';
import { IHttpResponse } from '../interfaces';

export class HttpResponse<T = any> implements IHttpResponse<T> {
  readonly body: T;

  readonly error: AxiosError;

  readonly success: boolean;

  readonly message: string;

  readonly status: number;

  constructor({ status, message, body, error }) {
    this.status = status;
    this.message = message;
    this.body = body;
    this.error = error;
    this.success = !error;
  }

  static createHttpResponseFromAxios<R>(
    axiosResponse?: AxiosResponse<R>,
    axiosError?: AxiosError<R>,
  ): IHttpResponse<R> {
    if (axiosError) {
      return new HttpResponse<R>({
        status: axiosError.response?.status,
        error: axiosError,
        message: axiosError.response?.statusText,
        body: axiosError.response?.data,
      });
    }
    return new HttpResponse<R>({
      status: axiosResponse.status,
      error: axiosError,
      message: axiosResponse.statusText,
      body: axiosResponse.data,
    });
  }
}
