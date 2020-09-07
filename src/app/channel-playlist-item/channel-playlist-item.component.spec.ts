import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPlaylistItemComponent } from './channel-playlist-item.component';

describe('ChannelPlaylistItemComponent', () => {
  let component: ChannelPlaylistItemComponent;
  let fixture: ComponentFixture<ChannelPlaylistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPlaylistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPlaylistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
