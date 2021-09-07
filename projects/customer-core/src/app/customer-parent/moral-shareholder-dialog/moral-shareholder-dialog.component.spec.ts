import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoralShareholderDialogComponent} from './moral-shareholder-dialog.component';

describe('MoralShareholderDialogComponent', () => {
  let component: MoralShareholderDialogComponent;
  let fixture: ComponentFixture<MoralShareholderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoralShareholderDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoralShareholderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
