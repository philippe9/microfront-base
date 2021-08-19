import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShToolbarComponent } from './sh-toolbar.component';

describe('ShToolbarComponent', () => {
  let component: ShToolbarComponent;
  let fixture: ComponentFixture<ShToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
