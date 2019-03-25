import {Injectable} from '@angular/core';
import {HttpHeader, HttpRequestType} from '../util/http';
import {parse} from '../util';

import http, {AxiosResponse} from 'axios';
import {select, Store} from '@ngrx/store';
import {WorkspaceState} from '../store/workspace.reducers';
import {map, switchMap, take} from 'rxjs/operators';
import {from, Observable} from 'rxjs';

@Injectable()
export class RequestService {
  constructor(private store: Store<{ workspace: WorkspaceState }>) {
  }

  perform(type: HttpRequestType, url: string, query?: HttpHeader[], body?: any, headers?: HttpHeader[]): Observable<AxiosResponse> {
    return this.store.pipe(
      select('workspace'),
      take(1),
      map(state => state.environment.active.env),
      switchMap(env => {
        const urlQuery: any = {};
        if (query) {
          query.forEach(queryParam => {
            urlQuery[queryParam.name] = parse(queryParam.value, env);
          });
        }

        const requestHeaders: any = {};
        if (headers) {
          headers.forEach(header => {
            requestHeaders[header.name] = parse(header.value, env);
          });
        }

        const request = http.request({
          method: type,
          url: parse(url, env),
          headers: requestHeaders,
          params: urlQuery,
          data: parse(body, env)
        });

        return from(request);
      })
    );
  }
}
