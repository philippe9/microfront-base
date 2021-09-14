import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountClosedListComponent} from './account-closed-list.component';

describe('AccountClosedListComponent', () => {
  let component: AccountClosedListComponent;
  let fixture: ComponentFixture<AccountClosedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountClosedListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountClosedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
