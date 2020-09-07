import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelateVideoComponent } from './relate-video.component';

describe('RelateVideoComponent', () => {
  let component: RelateVideoComponent;
  let fixture: ComponentFixture<RelateVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelateVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelateVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
