import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchContentComponent } from './watch-content.component';

describe('WatchContentComponent', () => {
  let component: WatchContentComponent;
  let fixture: ComponentFixture<WatchContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
