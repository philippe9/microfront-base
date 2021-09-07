import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeceasedCustomerListComponent} from './deceased-customer-list.component';

describe('DeceasedCustomerListComponent', () => {
  let component: DeceasedCustomerListComponent;
  let fixture: ComponentFixture<DeceasedCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeceasedCustomerListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeceasedCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
