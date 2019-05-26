import { TestBed } from '@angular/core/testing';

import { RepeatService } from './repeat.service';

describe('RepeatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepeatService = TestBed.get(RepeatService);
    expect(service).toBeTruthy();
  });
});
