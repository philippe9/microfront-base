import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeceasedCustomerViewComponent} from './deceased-customer-view.component';

describe('DeceasedCustomerViewComponent', () => {
  let component: DeceasedCustomerViewComponent;
  let fixture: ComponentFixture<DeceasedCustomerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeceasedCustomerViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeceasedCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
