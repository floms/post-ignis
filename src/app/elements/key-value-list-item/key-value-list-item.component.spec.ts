import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyValueListItemComponent } from './key-value-list-item.component';

describe('KeyValueListItemComponent', () => {
  let component: KeyValueListItemComponent;
  let fixture: ComponentFixture<KeyValueListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyValueListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyValueListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
