import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from './material-ui/material-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RequestListItemComponent } from './elements/request-list-item/request-list-item.component';
import { KeyValueListItemComponent } from './elements/key-value-list-item/key-value-list-item.component';
import { KeyValueListComponent } from './elements/key-value-list/key-value-list.component';
import { HttpHeadersListComponent } from './elements/http-headers-list/http-headers-list.component';

import { RequestWindowComponent } from './elements/request-window/request-window.component';

import { PrimeNGModule } from './prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    AppComponent,

    RequestListItemComponent,
    KeyValueListItemComponent,
    KeyValueListComponent,
    HttpHeadersListComponent,
    RequestWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    HttpClientModule,
    PrimeNGModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
