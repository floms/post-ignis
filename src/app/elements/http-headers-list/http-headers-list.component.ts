import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KeyValueItem } from 'src/app/util/generic';

@Component({
  selector: 'app-http-headers-list',
  templateUrl: './http-headers-list.component.html',
  styleUrls: ['./http-headers-list.component.scss']
})
export class HttpHeadersListComponent implements OnInit {
  @Input() list: KeyValueItem[] = [];

  @Output() change: EventEmitter<KeyValueItem[]>  = new EventEmitter();

  suggestions = {
    'Authorization': [],
    'User-Agent': [],
    'Accept': [],
    'Content-Type': [
      'application/json',
      'application/x-www-form-urlencoded',
      'application/rss+xml',
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  onHeadersChange() {
    this.change.emit(this.list);
  }
}
