import { AxiosError, ResponseType } from 'axios';
import { MethodsEnum } from '../enums/methods.enum';

export interface IAuthorization {
  addAuthorizationToRequest(httpRequestOptions: IHttpRequestOptions<any>): void;
}

export interface IHttpRequestOptions<Body> {
  method: MethodsEnum;
  url: string;
  authorization: IAuthorization;
  body?: Body;
  headers?: any;
  proxy?: any;
  responseType: ResponseType;
  queryParams?: any;
  httpAgent?: any;
  httpsAgent?: any;
  transformRequest?: any;
  transformResponse?: any;

  setAuth(IAuthorization): void;

  addHeaders(headers: any): void;
}

export interface IHttpResponse<Body> {
  success: boolean;
  status: number;
  message?: string;
  body?: Body;
  error?: AxiosError;
}

export interface IHttpRequest<Body, U> {
  options: IHttpRequestOptions<Body>;

  run(): Promise<IHttpResponse<U>>;
}
