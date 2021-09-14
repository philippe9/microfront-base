import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationLotsComponent } from './consultation-lots.component';

describe('ConsultationLotsComponent', () => {
  let component: ConsultationLotsComponent;
  let fixture: ComponentFixture<ConsultationLotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationLotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
