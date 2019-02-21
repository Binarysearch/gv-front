import { TestBed } from '@angular/core/testing';

import { SelectGalaxyGuard } from './select-galaxy-guard.service';

describe('SelectGalaxyGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectGalaxyGuard = TestBed.get(SelectGalaxyGuard);
    expect(service).toBeTruthy();
  });
});
