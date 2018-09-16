import { Injectable } from '@angular/core';
import { DataPersistence } from './data-persistence.class';

@Injectable({
  providedIn: 'root'
})
export class WorkspacePersistenceService  extends DataPersistence {

  name() {
    return 'workspace';
  }
}