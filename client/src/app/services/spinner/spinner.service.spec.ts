import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinnerService = TestBed.get(SpinnerService);
    expect(service).toBeTruthy();
  });
});
