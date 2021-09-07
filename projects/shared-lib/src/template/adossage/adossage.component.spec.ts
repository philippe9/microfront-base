import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdossageComponent } from './adossage.component';

describe('AdossageComponent', () => {
  let component: AdossageComponent;
  let fixture: ComponentFixture<AdossageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdossageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdossageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
