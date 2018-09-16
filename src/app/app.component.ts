import {
  Component
} from '@angular/core';

import {
  HttpRequestType
} from './util/http';
import {
  RequestPersistence
} from './data-persistence/request-persistence.service';
import {
  WorkspacePersistenceService
} from './data-persistence/workspace-persistence.service';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PostIgnis';
  activeTabIndex = 0;

  allHistory = [];
  history = [];
  tabs = [];

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private workspace: WorkspacePersistenceService, private requests: RequestPersistence) {}

  async ngOnInit() {
    const keywordFormControl = new FormControl();

    this.searchForm = this.formBuilder.group({
      keyword: keywordFormControl
    });

    this.allHistory = await this.requests.all({
      descending: true
    });

    this.onSearch();

    keywordFormControl.valueChanges.pipe(startWith('')).subscribe(term => this.onSearch(term));

    this.tabs = await this.workspace.all();
    this.addNewRequestTab();

    if (this.tabs.length === 1) {
      this.addNewRequestTab();
    }
  }

  onSearch(term?: string) {
    if (!term) {
      return this.history = this.allHistory;
    }

    this.history = this.allHistory.filter(request => request.request.url.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  }

  async onRequestSent(request, tab) {
    if (tab.id) {
      const record: any = {
        request
      };
      record.id = tab.id;

      await this.workspace.update(record);
    } else {
      const record = await this.workspace.add({
        request
      });

      tab.id = record.id;
      tab.rev = record.rev;
    }

    const history: any = await this.requests.add({
      request,
      date: new Date()
    });

    // add it to the top
    this.history.unshift({
      id: history.id,
      request
    })
  }

  get LastIndex() {
    return this.tabs.length - 1;
  }

  loadRequest(request) {
    const lastIndex = this.LastIndex;

    this.tabs[lastIndex].request = {
      ...request
    };

    this.addNewRequestTab();

    this.activeTabIndex = lastIndex;
  }

  isLastTab(index) {
    return index === this.LastIndex;
  }


  onTabChanged(event: any) {
    if (event.index === this.LastIndex) {
      this.addNewRequestTab();
    }
  }

  async onTabClosed(event: any) {
    const [removed] = this.tabs.splice(event.index, 1);

    if (removed.id) {
      await this.workspace.remove(removed);
    }

    if (this.tabs.length === 1) {
      this.addNewRequestTab();
    }
  }

  private addNewRequestTab() {
    this.tabs.push(this.newTab());
  }

  private newTab() {
    return {
      id: '',
      request: {
        type: HttpRequestType.GET,
        url: '',
        body: '',
        params: [],
        headers: []
      }
    };
  }

  getRequestName(request) {
    return `${request.request.type} ${request.request.url}`;
  }
}