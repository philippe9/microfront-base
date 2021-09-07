import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerOppositionViewComponent} from './customer-opposition-view.component';

describe('CustomerOppositionViewComponent', () => {
  let component: CustomerOppositionViewComponent;
  let fixture: ComponentFixture<CustomerOppositionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOppositionViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOppositionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
