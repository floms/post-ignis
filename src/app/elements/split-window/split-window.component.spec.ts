import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitWindowComponent } from './split-window.component';

describe('SplitWindowComponent', () => {
  let component: SplitWindowComponent;
  let fixture: ComponentFixture<SplitWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
