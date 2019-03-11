import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentDialogComponent } from './environment-dialog.component';

describe('EnvironmentDialogComponent', () => {
  let component: EnvironmentDialogComponent;
  let fixture: ComponentFixture<EnvironmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
