import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMoralComponent } from './customer-moral.component';

describe('CustomerMoralComponent', () => {
  let component: CustomerMoralComponent;
  let fixture: ComponentFixture<CustomerMoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMoralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
