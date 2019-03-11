import {Component, OnInit} from '@angular/core';

import {HttpRequestType} from './util/http';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {EnvironmentDialogComponent} from './elements/environment-dialog/environment-dialog.component';

import {from, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {
  WorkspaceAddTab,
  WorkspaceLoad,
  WorkspaceLoadEnvironments,
  WorkspaceLoadState,
  WorkspaceRemoveTab,
  WorkspaceStateChange,
  WorkspaceUpdateTab
} from './store/workspace.actions';
import {HistoryService} from './data/history.service';
import {MigrationService} from './migrations/migration.service';
import {HistoryLoad, HistorySearch, HistorySend} from './store/history.actions';
import {historySearch} from './store/history.reducers';
import {WorkspaceState} from './store/workspace.reducers';
import {WorkspaceService} from './data/workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  environmentForm: FormGroup;
  searchForm: FormGroup;

  onInit$: Observable<any>;
  history$: Observable<any[]>;
  workspace$: Observable<any>;

  environmentControl: FormControl;
  searchControl: FormControl;


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private migrations: MigrationService,
    private workspaceService: WorkspaceService,
    private historyService: HistoryService,
    private store: Store<{ workspace: WorkspaceState }>
  ) {
    this.onInit$ = this.initialize();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EnvironmentDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      // environment config done
    });
  }

  onSidebarResize(sidebarWidth: number) {
    this.store.dispatch(new WorkspaceStateChange({sidebarWidth}));
  }

  ngOnInit() {
    this.onInit$.subscribe(() => this.setup());
  }

  onRequestSent(request, tab) {
    this.store.dispatch(new WorkspaceUpdateTab({
      ...tab,
      request,
      date: {
        ...tab.date,
        updated: new Date()
      }
    }));

    this.store.dispatch(new HistorySend({
      request,
      date: new Date()
    }));
  }

  loadRequest(request) {
    this.store.dispatch(new WorkspaceAddTab({
      request: {
        ...request
      },
      date: {
        opened: new Date(),
        updated: new Date()
      }
    }));
  }

  addTab() {
    this.store.dispatch(new WorkspaceAddTab({
      request: {
        type: HttpRequestType.GET,
        url: '',
        body: '',
        params: [],
        headers: []
      },
      date: {
        opened: new Date(),
        updated: new Date()
      }
    }));
  }

  onTabChange(event: any) {
    this.store.dispatch(new WorkspaceStateChange({activeTab: event.index}));
  }

  onTabClosed(event: any) {
    this.store.dispatch(new WorkspaceRemoveTab(event.index));
  }

  onCopy(data: any) {
    electron.clipboard.writeText(data);
  }

  initialize(): Observable<any> {
    return this.migrations.run([
      {
        source: 'workspace',
        mapper(item: any) {
          const data = item.doc;
          delete data.id;
          delete data._id;
          delete data.rev;
          delete data._rev;

          data._id = item.id;

          return {
            ...data,
            date: {
              opened: data._id,
              updated: new Date()
            }
          };
        },
        handler: this.workspaceService
      },
      {
        source: 'requests',
        mapper(item: any) {
          const data = item.doc;
          delete data.id;
          delete data._id;
          delete data.rev;
          delete data._rev;

          data._id = item.id;

          return data;
        },
        handler: this.historyService
      }
    ]);
  }

  private setup() {
    this.store.dispatch(new HistoryLoad());
    this.store.dispatch(new WorkspaceLoad());
    this.store.dispatch(new WorkspaceLoadState());
    this.store.dispatch(new WorkspaceLoadEnvironments());

    this.history$ = this.store.pipe(select(historySearch));

    this.workspace$ = this.store.pipe(select('workspace'), tap((workspace: any) => {
      this.environmentControl.patchValue(workspace.environment.active, {emitEvent: false});
    }));

    this.environmentControl = new FormControl();

    this.environmentControl.valueChanges.subscribe(environment => {
      this.store.dispatch(new WorkspaceStateChange({
        environment: environment.id
      }));
    });

    this.environmentForm = this.formBuilder.group({
      environment: this.environmentControl
    });

    this.searchControl = new FormControl();

    this.searchForm = this.formBuilder.group({
      keyword: this.searchControl
    });

    this.searchControl.valueChanges
      .subscribe(term => this.store.dispatch(new HistorySearch(term)));
  }
}
