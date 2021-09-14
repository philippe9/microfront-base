import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofiJasperViewerComponent } from './microfi-jasper-viewer.component';

describe('MicrofiJasperViewerComponent', () => {
  let component: MicrofiJasperViewerComponent;
  let fixture: ComponentFixture<MicrofiJasperViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofiJasperViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofiJasperViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
