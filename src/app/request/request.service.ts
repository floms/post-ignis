import {Injectable} from '@angular/core';
import {HttpHeader, HttpRequestType} from '../util/http';

import http, {AxiosResponse} from 'axios';

@Injectable()
export class RequestService {
  async perform(type: HttpRequestType, url: string, query?: HttpHeader[], body?: any, headers?: HttpHeader[]): Promise<AxiosResponse> {

    const urlQuery: any = {};
    if (query) {
      query.forEach(queryParam => {
        urlQuery[queryParam.name] = queryParam.value;
      });
    }

    const requestHeaders: any = {};
    if (headers) {
      headers.forEach(header => {
        requestHeaders[header.name] = header.value;
      });
    }


    return http.request({
      method: type,
      url,
      headers: requestHeaders,
      params: urlQuery,
      data: body
    });
  }
}
