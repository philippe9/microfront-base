import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCancelOppositionComponent } from './account-cancel-opposition.component';

describe('AccountCancelOppositionComponent', () => {
  let component: AccountCancelOppositionComponent;
  let fixture: ComponentFixture<AccountCancelOppositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCancelOppositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCancelOppositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
