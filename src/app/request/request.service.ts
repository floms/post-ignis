import { Injectable } from '@angular/core';
import * as request from 'superagent';
import { HttpRequestType, HttpHeader } from '../util/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  async perform(type: HttpRequestType, url: string, query?: HttpHeader[], body?: any, headers?: HttpHeader[]) {
    let req = this.buildRequest(type, url);
    if (query) {
      const urlQuery: any = {};

      query.forEach(queryParam => {
        urlQuery[queryParam.name] = queryParam.value;
      });

      req = req.query(urlQuery);
    }

    if (headers) {
      const requestHeaders: any = {};

      headers.forEach(header => {
        requestHeaders[header.name] = header.value;
      });

      req = req.set(requestHeaders);
    }
    
    if (body) {
      req = req.send(body);
    }

    return await req;

  }

  private buildRequest(type: HttpRequestType, url: string) {
    switch (type) {
      case HttpRequestType.DELETE:
        return request.delete(url);
      case HttpRequestType.POST:
        return request.post(url);
      case HttpRequestType.PATCH:
        return request.patch(url);
      case HttpRequestType.PUT:
        return request.put(url);
      default:
        return request.get(url);
    }
  }
}
