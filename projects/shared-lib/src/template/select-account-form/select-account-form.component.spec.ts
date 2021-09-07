import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectAccountFormComponent} from './select-account-form.component';

describe('SelectAccountFormComponent', () => {
  let component: SelectAccountFormComponent;
  let fixture: ComponentFixture<SelectAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAccountFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
