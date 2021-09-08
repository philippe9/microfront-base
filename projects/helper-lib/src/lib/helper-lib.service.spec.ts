import { TestBed } from '@angular/core/testing';

import { HelperLibService } from './helper-lib.service';

describe('HelperLibService', () => {
  let service: HelperLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
