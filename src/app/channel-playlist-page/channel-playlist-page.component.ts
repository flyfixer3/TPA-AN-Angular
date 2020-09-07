import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PlaylistsServiceService } from '../playlists-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-playlist-page',
  templateUrl: './channel-playlist-page.component.html',
  styleUrls: ['./channel-playlist-page.component.sass']
})
export class ChannelPlaylistPageComponent implements OnInit {

  constructor(private userService:UserService,public playlistService:PlaylistsServiceService, private activity:ActivatedRoute) { }
  lastKey;
  observer
  playlists
  isShow;
  user:{
    id:String
    name:String
    email: String
    profile_pict: String
    premium: Boolean
    channel_background: String
  };
  
  ngOnInit(): void {
    this.user = this.userService.getChannelUser()
    console.log(this.user.id)
    this.playlists = this.playlistService.getPlaylistsByUserId(this.user.id)
    this.lastKey = 12;
    this.observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        let main = document.querySelector('.playlist__grid');
        for (let i = 0; i < 4; i++) {
          if (this.lastKey < this.playlists.length) {
            let div = document.createElement('div');
            let playlist = document.createElement('app-channel-playlist-item');
            playlist.setAttribute('playlist', 'this.playlist[this.lastKey]');
            div.appendChild(playlist);
            main.appendChild(div);
            this.lastKey++;
          }
        }
      }
    });
    this.observer.observe(document.querySelector('.end-point')); 
  }
}
