import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountReservationListComponent} from './account-reservation-list.component';

describe('AccountReservationListComponent', () => {
  let component: AccountReservationListComponent;
  let fixture: ComponentFixture<AccountReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountReservationListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
