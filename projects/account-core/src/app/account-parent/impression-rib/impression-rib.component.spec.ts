import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionRibComponent } from './impression-rib.component';

describe('ImpressionRibComponent', () => {
  let component: ImpressionRibComponent;
  let fixture: ComponentFixture<ImpressionRibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressionRibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressionRibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
