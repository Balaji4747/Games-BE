import { ResponseType } from 'axios';
import { MethodsEnum } from '../enums/methods.enum';
import { IAuthorization, IHttpRequestOptions } from '../interfaces';
import { NoAuthorization } from './authorization';

export class HttpRequestOptions<T> implements IHttpRequestOptions<T> {
  method: MethodsEnum;

  url: string;

  authorization: IAuthorization;

  body?: T;

  headers?: any;

  proxy?: any;

  responseType: ResponseType;

  queryParams?: any;

  constructor({ method = MethodsEnum.GET, url, body }: { method: MethodsEnum; url: string; body?: T }) {
    this.method = method;
    this.url = url;
    this.authorization = new NoAuthorization();
    this.body = body;
    this.headers = { 'X-New-Be': 'true' };
    this.responseType = 'json';
    this.queryParams = {};
  }

  setAuth(authorization: IAuthorization): IHttpRequestOptions<T> {
    this.authorization = authorization;
    return this;
  }

  addHeaders(headers: any): void {
    Object.assign(this.headers, headers);
  }
}
