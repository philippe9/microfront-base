import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPatnerFormComponent } from './select-patner-form.component';

describe('SelectPatnerFormComponent', () => {
  let component: SelectPatnerFormComponent;
  let fixture: ComponentFixture<SelectPatnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPatnerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPatnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
