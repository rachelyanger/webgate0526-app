import { TestBed } from '@angular/core/testing';

import { CreatphantomService } from './creatphantom.service';

describe('CreatphantomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatphantomService = TestBed.get(CreatphantomService);
    expect(service).toBeTruthy();
  });
});
