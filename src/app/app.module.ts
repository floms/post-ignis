import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialUIModule} from './material-ui/material-ui.module';
import {HttpClientModule} from '@angular/common/http';
import {RequestListItemComponent} from './elements/request-list-item/request-list-item.component';
import {KeyValueListItemComponent} from './elements/key-value-list-item/key-value-list-item.component';
import {KeyValueListComponent} from './elements/key-value-list/key-value-list.component';
import {HttpHeadersListComponent} from './elements/http-headers-list/http-headers-list.component';

import {RequestWindowComponent} from './elements/request-window/request-window.component';

import {PrimeNGModule} from './prime-ng/prime-ng.module';
import {TabsComponent} from './elements/tabs/tabs.component';
import {TabViewComponent} from './elements/tabs/tab-view/tab-view.component';
import {TabHeaderComponent} from './elements/tabs/tab-header/tab-header.component';
import {RequestTypeComponent} from './elements/request-type/request-type.component';
import {SplitWindowComponent} from './elements/split-window/split-window.component';
import {StoreModule} from '@ngrx/store';
import {EnvironmentDialogComponent} from './elements/environment-dialog/environment-dialog.component';
import {workspaceReducer} from './store/workspace.reducers';
import {EffectsModule} from '@ngrx/effects';
import {WorkspaceEffects} from './store/workspace.effects';
import {historyReducer} from './store/history.reducers';
import {HistoryEffects} from './store/history.effects';
import {WorkspaceService} from './data/workspace.service';
import {StateService} from './data/state.service';
import {EnvironmentService} from './data/environment.service';
import {HistoryService} from './data/history.service';
import {MigrationService} from './migrations/migration.service';
import {RequestService} from './request/request.service';
import { SplashComponent } from './elements/splash/splash.component';


@NgModule({
  entryComponents: [
    EnvironmentDialogComponent
  ],
  declarations: [
    AppComponent,
    RequestListItemComponent,
    KeyValueListItemComponent,
    KeyValueListComponent,
    HttpHeadersListComponent,
    RequestWindowComponent,
    TabsComponent,
    TabViewComponent,
    TabHeaderComponent,
    RequestTypeComponent,
    SplitWindowComponent,
    EnvironmentDialogComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    HttpClientModule,
    PrimeNGModule,
    StoreModule.forRoot({
      history: historyReducer,
      workspace: workspaceReducer,
    }),
    EffectsModule.forRoot([
      WorkspaceEffects,
      HistoryEffects
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    WorkspaceService,
    StateService,
    EnvironmentService,
    HistoryService,
    MigrationService,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
