import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrganismeFormComponent } from './select-organisme-form.component';

describe('SelectOrganismeFormComponent', () => {
  let component: SelectOrganismeFormComponent;
  let fixture: ComponentFixture<SelectOrganismeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOrganismeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrganismeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
