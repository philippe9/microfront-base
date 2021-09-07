import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoralPersonViewComponent} from './moral-person-view.component';

describe('MoralPersonViewComponent', () => {
  let component: MoralPersonViewComponent;
  let fixture: ComponentFixture<MoralPersonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoralPersonViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoralPersonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
