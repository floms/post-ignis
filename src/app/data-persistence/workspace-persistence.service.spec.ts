import { TestBed } from '@angular/core/testing';

import { WorkspacePersistenceService } from './workspace-persistence.service';

describe('WorkspacePersistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkspacePersistenceService = TestBed.get(WorkspacePersistenceService);
    expect(service).toBeTruthy();
  });
});
