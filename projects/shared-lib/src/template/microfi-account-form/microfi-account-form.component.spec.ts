import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofiAccountFormComponent } from './microfi-account-form.component';

describe('MicrofiAccountFormComponent', () => {
  let component: MicrofiAccountFormComponent;
  let fixture: ComponentFixture<MicrofiAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofiAccountFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofiAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
