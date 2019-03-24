import {Injectable} from '@angular/core';
import {HttpHeader, HttpRequestType} from '../util/http';

import http, {AxiosResponse} from 'axios';
import {select, Store} from '@ngrx/store';
import {WorkspaceState} from '../store/workspace.reducers';
import {map, switchMap, take} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import * as format from 'string-template';

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
            urlQuery[queryParam.name] = format(queryParam.value, env);
          });
        }

        const requestHeaders: any = {};
        if (headers) {
          headers.forEach(header => {
            requestHeaders[header.name] = format(header.value, env);
          });
        }

        const request = http.request({
          method: type,
          url,
          headers: requestHeaders,
          params: urlQuery,
          data: format(body, env)
        });

        return from(request);
      })
    );
  }
}
