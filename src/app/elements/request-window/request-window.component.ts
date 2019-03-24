import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpRequestType} from 'src/app/util/http';
import {RequestService} from 'src/app/request/request.service';
import {catchError, takeUntil, tap} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {AxiosResponse} from 'axios';

@Component({
  selector: 'app-request-window',
  templateUrl: './request-window.component.html',
  styleUrls: ['./request-window.component.scss']
})
export class RequestWindowComponent implements OnInit, OnDestroy, OnChanges {
  requestForm: FormGroup;
  requestTypes = [
    {label: HttpRequestType.GET, value: HttpRequestType.GET},
    {label: HttpRequestType.PUT, value: HttpRequestType.PUT},
    {label: HttpRequestType.POST, value: HttpRequestType.POST},
    {label: HttpRequestType.PATCH, value: HttpRequestType.PATCH},
    {label: HttpRequestType.DELETE, value: HttpRequestType.DELETE},
  ];
  params = [];
  headers = [];
  response = {
    headers: [],
    body: '',
    status: '',
    size: 0,
    time: 0,
    submitted: false,
    loading: true
  };
  @Input() request;
  @Output() sent: EventEmitter<any> = new EventEmitter();
  @Output() copyResponse: EventEmitter<any> = new EventEmitter();
  private $onDestroy = new Subject();

  constructor(private requestService: RequestService, private formBuilder: FormBuilder) {

  }

  get CurrentRequest() {
    const {type, url, body} = this.requestForm.value;

    // NOTE: parse query params out of the url
    // const queryStarts = url.indexOf('?');
    //
    // if (queryStarts > 0) {
    //   url = url.substr(0, queryStarts);
    // }

    return {
      type,
      url,
      body,
      params: this.params,
      headers: this.headers,
    };
  }

  get hasBody() {
    const requestBody = this.requestForm.value.body;

    return requestBody && requestBody.length > 0;
  }

  loadRequest() {
    if (this.request.type) {
      this.requestForm.patchValue({
        type: this.request.type,
        url: this.request.url,
        body: this.request.body
      });


      this.params = this.request.params;
      this.headers = this.request.headers;
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.requestForm) {
      this.loadRequest();
    }
  }

  ngOnInit() {
    const typeField = new FormControl(HttpRequestType.GET);
    const urlField = new FormControl();
    const bodyField = new FormControl();

    this.requestForm = this.formBuilder.group({
      type: typeField,
      url: urlField,
      body: bodyField
    });

    typeField.valueChanges
      .pipe(takeUntil(this.$onDestroy), tap(value => this.request.type = value))
      .subscribe(this.onRequestUpdate.bind(this));

    urlField.valueChanges
      .pipe(takeUntil(this.$onDestroy), tap(value => this.request.url = value))
      .subscribe(this.onRequestUpdate.bind(this));

    this.loadRequest();
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
  }

  onRequestUpdate() {
    // request is updated
  }

  sendRequest() {
    this.response.loading = true;
    this.response.submitted = true;

    const request = this.CurrentRequest;

    const params = request.params.filter(param => param.active).map(param => ({
      name: param.key,
      value: param.value
    }));

    const headers = request.headers.filter(header => header.active).map(header => ({
      name: header.key,
      value: header.value
    }));

    // remove last empty element "blank row"
    params.pop();
    headers.pop();

    const start = new Date();

    return this.requestService.perform(request.type, request.url, params, request.body, headers).pipe(
      catchError(error => {
        const response = error.response || {
          headers: {},
          status: '',
          statusText: error.message
        };

        return of(response);
      })
    ).subscribe(response => {
      this.processResponse(response);

      const end = new Date();

      this.response.time = end.getTime() - start.getTime();

      this.response.loading = false;
      this.response.submitted = false;

      this.sent.emit(this.CurrentRequest);
    });
  }

  onCopy() {
    this.copyResponse.emit(this.response.body);
  }

  processResponse(res: AxiosResponse) {
    try {
      const body = res.data;

      if (typeof body === 'object') {
        this.response.body = JSON.stringify(body, null, 2);
      } else {
        this.response.body = body;
      }

      this.response.headers = Object.keys(res.headers).map(key => {
        return {
          key,
          value: res.headers[key]
        };
      });
      this.response.status = `${res.status} ${res.statusText}`;
    } catch (error) {

    }
  }
}
