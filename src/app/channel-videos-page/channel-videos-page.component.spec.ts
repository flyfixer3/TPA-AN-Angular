import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelVideosPageComponent } from './channel-videos-page.component';

describe('ChannelVideosPageComponent', () => {
  let component: ChannelVideosPageComponent;
  let fixture: ComponentFixture<ChannelVideosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelVideosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelVideosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
