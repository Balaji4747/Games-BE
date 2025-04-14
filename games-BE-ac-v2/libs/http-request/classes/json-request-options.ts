import { ResponseType } from 'axios';
import { MethodsEnum } from '../enums/methods.enum';
import { IAuthorization, IHttpRequestOptions } from '../interfaces';
import { NoAuthorization } from './authorization';

export class JsonRequestOptions<Body, QueryParams = null> implements IHttpRequestOptions<Body> {
  method: MethodsEnum;

  url: string;

  authorization: IAuthorization;

  body?: Body;

  headers?: any;

  proxy?: any;

  responseType: ResponseType;

  queryParams?: QueryParams;

  httpAgent?: any;

  httpsAgent?: any;

  transformRequest?: any;

  transformResponse?: any;

  constructor({
    method = MethodsEnum.GET,
    url,
    body,
    responseType = 'json',
    queryParams = {} as QueryParams,
  }: {
    method: MethodsEnum;
    url: string;
    body?: Body;
    responseType?: ResponseType;
    queryParams?: any;
  }) {
    this.method = method;
    this.url = url;
    this.authorization = new NoAuthorization();
    this.body = body;
    this.headers = {
      'Content-type': 'application/json',
    };
    this.responseType = responseType;
    this.queryParams = queryParams;
  }

  setAuth(authorization: IAuthorization): IHttpRequestOptions<Body> {
    this.authorization = authorization;
    return this;
  }

  addHeaders(headers: any): void {
    Object.assign(this.headers, headers);
  }
}
