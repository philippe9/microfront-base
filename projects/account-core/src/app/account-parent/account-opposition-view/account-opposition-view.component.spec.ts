import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountOppositionViewComponent} from './account-opposition-view.component';

describe('AccountOppositionViewComponent', () => {
  let component: AccountOppositionViewComponent;
  let fixture: ComponentFixture<AccountOppositionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOppositionViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOppositionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
