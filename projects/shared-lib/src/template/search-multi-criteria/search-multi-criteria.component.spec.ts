import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchMultiCriteriaComponent} from './search-multi-criteria.component';

describe('SearchMultiCriteriaComponent', () => {
  let component: SearchMultiCriteriaComponent;
  let fixture: ComponentFixture<SearchMultiCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMultiCriteriaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMultiCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
