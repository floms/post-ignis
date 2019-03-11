import { NgModule } from '@angular/core';

import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [],
  exports: [
    InputTextareaModule,
    ListboxModule,
    SplitButtonModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    TabViewModule,
    ButtonModule
  ]
})
export class PrimeNGModule { }
