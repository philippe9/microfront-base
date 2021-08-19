import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShButtonComponent } from './sh-button.component';

describe('ShButtonComponent', () => {
  let component: ShButtonComponent;
  let fixture: ComponentFixture<ShButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
