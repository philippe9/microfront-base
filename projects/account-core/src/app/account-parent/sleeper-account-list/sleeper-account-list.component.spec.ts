import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SleeperAccountListComponent} from './sleeper-account-list.component';

describe('SleeperAccountListComponent', () => {
  let component: SleeperAccountListComponent;
  let fixture: ComponentFixture<SleeperAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SleeperAccountListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SleeperAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
