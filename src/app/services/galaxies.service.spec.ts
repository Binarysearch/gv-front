import { TestBed } from '@angular/core/testing';

import { GalaxiesService } from './galaxies.service';

describe('GalaxiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalaxiesService = TestBed.get(GalaxiesService);
    expect(service).toBeTruthy();
  });
});
