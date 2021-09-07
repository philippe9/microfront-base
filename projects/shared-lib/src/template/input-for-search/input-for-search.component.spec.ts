import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputForSearchComponent} from './input-for-search.component';

describe('InputForSearchComponent', () => {
  let component: InputForSearchComponent;
  let fixture: ComponentFixture<InputForSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputForSearchComponent]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputForSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
