import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerOppositionListComponent} from './customer-opposition-list.component';

describe('CustomerOppositionListComponent', () => {
  let component: CustomerOppositionListComponent;
  let fixture: ComponentFixture<CustomerOppositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOppositionListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOppositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
