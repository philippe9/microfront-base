import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionAccountHistoryComponent } from './position-account-history.component';

describe('PositionAccountHistoryComponent', () => {
  let component: PositionAccountHistoryComponent;
  let fixture: ComponentFixture<PositionAccountHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionAccountHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionAccountHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
