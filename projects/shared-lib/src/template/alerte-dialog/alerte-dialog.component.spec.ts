import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteDialogComponent } from './alerte-dialog.component';

describe('AlerteDialogComponent', () => {
  let component: AlerteDialogComponent;
  let fixture: ComponentFixture<AlerteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlerteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
