import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofiLovFormComponent } from './microfi-lov-form.component';

describe('MicrofiLovFormComponent', () => {
  let component: MicrofiLovFormComponent;
  let fixture: ComponentFixture<MicrofiLovFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofiLovFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofiLovFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
