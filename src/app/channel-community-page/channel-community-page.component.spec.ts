import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCommunityPageComponent } from './channel-community-page.component';

describe('ChannelCommunityPageComponent', () => {
  let component: ChannelCommunityPageComponent;
  let fixture: ComponentFixture<ChannelCommunityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCommunityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
