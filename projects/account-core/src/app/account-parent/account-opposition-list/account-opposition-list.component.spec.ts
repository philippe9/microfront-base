import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountOppositionListComponent} from './account-opposition-list.component';

describe('AccountOppositionListComponent', () => {
  let component: AccountOppositionListComponent;
  let fixture: ComponentFixture<AccountOppositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOppositionListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOppositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
