import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpHeadersListComponent } from './http-headers-list.component';

describe('HttpHeadersListComponent', () => {
  let component: HttpHeadersListComponent;
  let fixture: ComponentFixture<HttpHeadersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpHeadersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpHeadersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
