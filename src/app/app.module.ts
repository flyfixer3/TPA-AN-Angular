import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    CommentComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    AppRoutingModule
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
