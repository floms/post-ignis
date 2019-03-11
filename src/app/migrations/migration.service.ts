import {Injectable} from '@angular/core';
import {DataProviderBase} from '../data/data-provider-base';
import {catchError, concatMap, finalize, last, switchMap} from 'rxjs/operators';
import {forkJoin, from, of} from 'rxjs';
import {DataHandler} from '../data/data-handler';

export interface Migration {
  source: string;
  mapper: (a: any) => any;
  handler: DataHandler;
}

@Injectable()
export class MigrationService {
  run(migrations: Migration[]) {
    if (migrations.length === 0) {
      return of(true);
    }

    const execution$ = migrations.map((migration: Migration) => this.migrate(migration.source, migration.mapper, migration.handler));

    return forkJoin.apply(this, execution$);
  }

  private migrate(source: string, mapper: (a: any) => any, handler: DataHandler) {
    const db = new DataProviderBase(source);

    return db.all().pipe(
      switchMap((records: any) => from(records)),
      concatMap(item => handler.add(mapper(item))),
      last(),
      finalize(() => db.destroy()),
      catchError(() => {
        // TODO: there was an error with the migration
        return of({});
      })
    );
  }
}
