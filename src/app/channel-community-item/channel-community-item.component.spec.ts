import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCommunityItemComponent } from './channel-community-item.component';

describe('ChannelCommunityItemComponent', () => {
  let component: ChannelCommunityItemComponent;
  let fixture: ComponentFixture<ChannelCommunityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCommunityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCommunityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
