import { TestBed } from '@angular/core/testing';

import { AccountManagerResolver } from './account-manager.resolver';

describe('AccountManagerResolver', () => {
  let resolver: AccountManagerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AccountManagerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
