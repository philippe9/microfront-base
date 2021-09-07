import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhysicShareholderDialogComponent} from './physic-shareholder-dialog.component';

describe('PhysicShareholderDialogComponent', () => {
  let component: PhysicShareholderDialogComponent;
  let fixture: ComponentFixture<PhysicShareholderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhysicShareholderDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicShareholderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
