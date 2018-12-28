import { TestBed } from '@angular/core/testing';

import { ComisionService } from './comision.service';

describe('ComisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComisionService = TestBed.get(ComisionService);
    expect(service).toBeTruthy();
  });
});
