import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { VideoComponent } from './video/video.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { SearchBoxComponent } from './search-box/search-box.component';
import { UserFeaturesBarComponent } from './user-features-bar/user-features-bar.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarItemComponent } from './side-bar-item/side-bar-item.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { WatchContentComponent } from './watch-content/watch-content.component';
import { CommentComponent } from './comment/comment.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RelateVideoComponent } from './relate-video/relate-video.component';
import { SearchVideoComponent } from './search-video/search-video.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { ChannelContentComponent } from './channel-content/channel-content.component';
import { ChannelHomePageComponent } from './channel-home-page/channel-home-page.component';
import { ChannelVideosPageComponent } from './channel-videos-page/channel-videos-page.component';
import { SideBarChannelComponent } from './side-bar-channel/side-bar-channel.component';
import { SideBarPlaylistComponent } from './side-bar-playlist/side-bar-playlist.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { VideoPlaylistComponent } from './video-playlist/video-playlist.component';
import { ChannelPlaylistItemComponent } from './channel-playlist-item/channel-playlist-item.component';
import { ChannelPlaylistPageComponent } from './channel-playlist-page/channel-playlist-page.component';
import { ChannelCommunityPageComponent } from './channel-community-page/channel-community-page.component';
import { ChannelCommunityItemComponent } from './channel-community-item/channel-community-item.component';
import { TrendContentComponent } from './trend-content/trend-content.component';

const config = {
  apiKey: "AIzaSyBQ3PrCI2qz5L4WNW73TlabzTbrSDpLdRE",
  authDomain: "tpa-web-284810.firebaseapp.com",
  databaseURL: "https://tpa-web-284810.firebaseio.com",
  projectId: "tpa-web-284810",
  storageBucket: "tpa-web-284810.appspot.com",
  messagingSenderId: "991337320632",
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeContentComponent,
    VideoComponent,
    SearchBoxComponent,
    UserFeaturesBarComponent,
    SideBarComponent,
    SideBarItemComponent,
    WatchContentComponent,
    CommentComponent,
    RelateVideoComponent,
    SearchVideoComponent,
    SearchChannelComponent,
    ShortNumberPipe,
    ChannelContentComponent,
    ChannelHomePageComponent,
    ChannelVideosPageComponent,
    SideBarChannelComponent,
    SideBarPlaylistComponent,
    PlaylistDetailComponent,
    VideoPlaylistComponent,
    ChannelPlaylistItemComponent,
    ChannelPlaylistPageComponent,
    ChannelCommunityPageComponent,
    ChannelCommunityItemComponent,
    TrendContentComponent,
  ],
  imports: [
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '724389331143-63cegco71a333kgnjemikghq5me74e84.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
