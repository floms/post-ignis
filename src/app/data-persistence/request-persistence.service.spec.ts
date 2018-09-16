import { TestBed } from '@angular/core/testing';

import { RequestPersistence } from './request-persistence.service';

describe('PersistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestPersistence = TestBed.get(RequestPersistence);
    expect(service).toBeTruthy();
  });
});
