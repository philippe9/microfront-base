import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountClosedViewComponent} from './account-closed-view.component';

describe('AccountClosedViewComponent', () => {
  let component: AccountClosedViewComponent;
  let fixture: ComponentFixture<AccountClosedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountClosedViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountClosedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
