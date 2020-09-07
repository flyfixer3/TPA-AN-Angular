import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../user.service";
import { VideoDetailsService } from '../video-details.service'
import { DateServiceService } from '../date-service.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PlaylistsServiceService } from '../playlists-service.service';


@Component({
  selector: 'app-channel-home-page',
  templateUrl: './channel-home-page.component.html',
  styleUrls: ['./channel-home-page.component.sass']
})
export class ChannelHomePageComponent implements OnInit {

  constructor(private userService:UserService,private videoDetailService:VideoDetailsService, private dateService:DateServiceService, private router:Router ,private activity:ActivatedRoute, private playlistService:PlaylistsServiceService) {
    userService.channelUserValueChange.subscribe((value)=>{
      this.user = value
      this.recentUploadVideo = this.videoDetailService.sortVideoAscByDate(this.videoDetailService.getAllVideoByChannelId(this.user.id))[0]
      this.diffDate = this.dateService.calculateDifference(this.recentUploadVideo.created_at)
      this.fiveVideos = this.videoDetailService.getAllVideoByChannelId(this.user.id).slice(0,5)  
      this.threeplaylist = this.playlistService.getPlaylistsByUserId(this.user.id)
    })    
  }
  diffDate:string
  user:{
    id:String
    name:String
    profile_pict:String
    email:String
    channel_background:String
    premium:Boolean
    subscribers:{
      id:String
      target_id:String
      subscriber_id:String
      notification:Boolean
    }[]
  };

  recentUploadVideo;
  fiveVideos;
  threeplaylist;
  arr = Array;
  num = 5;

  ngOnInit(): void {
    if(this.userService.channelUser){
      this.user = this.userService.getChannelUser()
      this.recentUploadVideo = this.videoDetailService.sortVideoAscByDate(this.videoDetailService.getAllVideoByChannelId(this.user.id))[0]
      this.diffDate = this.dateService.calculateDifference(this.recentUploadVideo.created_at)
      this.fiveVideos = this.videoDetailService.getAllVideoByChannelId(this.user.id).slice(0,5) 
      this.threeplaylist = this.playlistService.getPlaylistsByUserId(this.user.id)
    }
  }

  goToVideosPage(){
    this.router.navigate(['../videos'], { relativeTo: this.activity });
  }

}
