import { IAuthorization, IHttpRequestOptions } from '../interfaces';

export class BasicAuthorization implements IAuthorization {
  readonly username: string;

  readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  get authorizationHeader(): string {
    const token = btoa(`${this.username}:${this.password}`);
    return `Basic ${token}`;
  }

  addAuthorizationToRequest(httpRequestOptions: IHttpRequestOptions<any>): void {
    Object.assign(httpRequestOptions.headers, { Authorization: this.authorizationHeader });
  }
}

export class BearerAuthorization implements IAuthorization {
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  get authorizationHeader(): string {
    return `Bearer ${this.token}`;
  }

  addAuthorizationToRequest(httpRequestOptions: IHttpRequestOptions<any>): void {
    Object.assign(httpRequestOptions.headers, { Authorization: this.authorizationHeader });
  }
}

export class HeaderAuthorization implements IAuthorization {
  readonly header: string;

  readonly value: string;

  constructor(header: string, value: string) {
    this.header = header;
    this.value = value;
  }

  addAuthorizationToRequest(httpRequestOptions: IHttpRequestOptions<any>): void {
    Object.assign(httpRequestOptions.headers, { [this.header]: this.value });
  }
}

export class NoAuthorization implements IAuthorization {
  addAuthorizationToRequest(httpRequestOptions: IHttpRequestOptions<any>): void {}
}
