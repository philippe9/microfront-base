import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCustomerComponentComponent } from './base-customer-component.component';

describe('BaseCustomerComponentComponent', () => {
  let component: BaseCustomerComponentComponent;
  let fixture: ComponentFixture<BaseCustomerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCustomerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCustomerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
