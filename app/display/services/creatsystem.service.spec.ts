import { TestBed } from '@angular/core/testing';

import { CreatsystemService } from './creatsystem.service';

describe('CreatsystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatsystemService = TestBed.get(CreatsystemService);
    expect(service).toBeTruthy();
  });
});
