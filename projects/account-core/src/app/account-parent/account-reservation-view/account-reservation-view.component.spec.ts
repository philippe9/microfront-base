import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountReservationViewComponent} from './account-reservation-view.component';

describe('AccountReservationViewComponent', () => {
  let component: AccountReservationViewComponent;
  let fixture: ComponentFixture<AccountReservationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountReservationViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReservationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
