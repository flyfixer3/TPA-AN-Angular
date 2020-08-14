import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeaturesBarComponent } from './user-features-bar.component';

describe('UserFeaturesBarComponent', () => {
  let component: UserFeaturesBarComponent;
  let fixture: ComponentFixture<UserFeaturesBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeaturesBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeaturesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
