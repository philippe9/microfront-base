import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuBadgeComponent } from './user-menu-badge.component';

describe('UserMenuBadgeComponent', () => {
  let component: UserMenuBadgeComponent;
  let fixture: ComponentFixture<UserMenuBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMenuBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
