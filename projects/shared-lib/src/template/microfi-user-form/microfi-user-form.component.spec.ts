import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofiUserFormComponent } from './microfi-user-form.component';

describe('MicrofiUserFormComponent', () => {
  let component: MicrofiUserFormComponent;
  let fixture: ComponentFixture<MicrofiUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofiUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofiUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
