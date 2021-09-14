import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCancelReservationComponent } from './account-cancel-reservation.component';

describe('AccountCancelReservationComponent', () => {
  let component: AccountCancelReservationComponent;
  let fixture: ComponentFixture<AccountCancelReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCancelReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCancelReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
