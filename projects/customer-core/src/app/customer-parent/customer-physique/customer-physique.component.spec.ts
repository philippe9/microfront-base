import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPhysiqueComponent } from './customer-physique.component';

describe('CustomerPhysiqueComponent', () => {
  let component: CustomerPhysiqueComponent;
  let fixture: ComponentFixture<CustomerPhysiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPhysiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
