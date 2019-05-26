import { TestBed } from '@angular/core/testing';

import { GetinputService } from './getinput.service';

describe('GetinputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetinputService = TestBed.get(GetinputService);
    expect(service).toBeTruthy();
  });
});
