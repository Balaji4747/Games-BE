import axios, { AxiosError, AxiosProxyConfig, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { IHttpRequest, IHttpRequestOptions, IHttpResponse } from '../interfaces';
import { HttpResponse } from './http-response';

export class HttpRequest<Options, Response> implements IHttpRequest<Options, Response> {
  options: IHttpRequestOptions<Options>;

  constructor(options: IHttpRequestOptions<Options>) {
    this.options = options;
  }

  static async execute<Options, Response>(
    httpRequestOptions: IHttpRequestOptions<Options>,
  ): Promise<IHttpResponse<Response>> {
    const httpRequest = new HttpRequest<Options, Response>(httpRequestOptions);
    return httpRequest.run();
  }

  async run(): Promise<IHttpResponse<Response>> {
    if (this.options.authorization) {
      this.options.authorization.addAuthorizationToRequest(this.options);
    }
    let axiosResponse: AxiosResponse<Response>;
    let axiosError: AxiosError<Response>;
    try {
      const options = {
        method: this.options.method as Method,
        url: this.options.url,
        headers: this.options.headers,
        data: this.options.body,
        proxy: false,
        responseType: this.options.responseType,
        params: this.options.queryParams,
      } as AxiosRequestConfig;
      if (this.options.proxy) {
        options.proxy = this.options.proxy as AxiosProxyConfig;
      }
      if (this.options.transformRequest) {
        options.transformRequest = this.options.transformRequest;
      }
      if (this.options.transformResponse) {
        options.transformResponse = this.options.transformResponse;
      }

      axiosResponse = await axios.request<Response>(options);
    } catch (err) {
      axiosError = err;
    }

    return HttpResponse.createHttpResponseFromAxios<Response>(axiosResponse, axiosError);
  }
}
