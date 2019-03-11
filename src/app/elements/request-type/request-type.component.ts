import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.scss']
})
export class RequestTypeComponent implements OnInit {

  @Input() type;

  constructor() { }

  ngOnInit() {
  }

  get ElementClass() {
    return this.type ? this.type.toLowerCase() : '';
  }

}
