import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContentComponent } from '../home-content/home-content.component';
import { WatchContentComponent } from '../watch-content/watch-content.component'
import { PlaylistDetailComponent } from '../playlist-detail/playlist-detail.component'
import { Routes, RouterModule } from '@angular/router';
import { ChannelContentComponent } from '../channel-content/channel-content.component';
import { ChannelHomePageComponent } from '../channel-home-page/channel-home-page.component';
import { ChannelVideosPageComponent } from '../channel-videos-page/channel-videos-page.component';
import { ChannelPlaylistPageComponent } from '../channel-playlist-page/channel-playlist-page.component';
import { ChannelCommunityPageComponent } from '../channel-community-page/channel-community-page.component';
import { TrendContentComponent } from '../trend-content/trend-content.component';

const routes: Routes = [
  { path: 'home', component: HomeContentComponent },
  { path: 'trending', component: TrendContentComponent },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  { path: 'playlist/:id', component: PlaylistDetailComponent },
  { path: 'watch/:id', component: WatchContentComponent },
  { path: 'channel/:id', component: ChannelContentComponent, children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', component: ChannelHomePageComponent},
    {path:'videos', component: ChannelVideosPageComponent},
    {path:'playlists', component: ChannelPlaylistPageComponent},
    {path:'community', component: ChannelCommunityPageComponent},
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
