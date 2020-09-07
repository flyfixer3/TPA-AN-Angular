import { Component, OnInit, HostListener } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { VideoDetailsService } from '../video-details.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-channel-videos-page',
  templateUrl: './channel-videos-page.component.html',
  styleUrls: ['./channel-videos-page.component.sass']
})
export class ChannelVideosPageComponent implements OnInit {

  constructor(private userService:UserService,public videoService:VideoDetailsService, private activity:ActivatedRoute) { }
  lastKey;
  observer
  videos
  isShow;
  user:{
    id:String
    name:String
    email: String
    profile_pict: String
    premium: Boolean
    channel_background: String
  };
  currentFeature = 0;
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.isShow = false;
  }
  ngOnInit(): void {
    this.user = this.userService.getChannelUser()
    console.log(this.user.id)
    this.videos = this.videoService.sortVideoAscByDate(this.videoService.getAllVideoByChannelId(this.user.id))
    this.lastKey = 12;
    this.observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        let main = document.querySelector('.video__grid');
        for (let i = 0; i < 4; i++) {
          if (this.lastKey < this.videos.length) {
            let div = document.createElement('div');
            let video = document.createElement('app-video');
            video.setAttribute('video', 'this.videos[this.lastKey]');
            div.appendChild(video);
            main.appendChild(div);
            this.lastKey++;
          }
        }
      }
    });
    this.observer.observe(document.querySelector('.end-point')); 
  }
  allVideo(){
    this.videos = this.videoService.getVideos()
  }
  toggleShowHideModal($event){
    $event.stopPropagation()
    this.isShow = !this.isShow;
  }
  sortNewest(){
    this.videos = [] = this.videos.sort((n1, n2) => {
      var a = new Date(n1.created_at);
      var b = new Date(n2.created_at);
      if (a.getTime() < b.getTime()) {
        return 1;
      } else return -1;
    });
    this.currentFeature = 0;
  }

  sortOldest(){
    this.videos = [] = this.videos.sort((n1, n2) => {
      var a = new Date(n1.created_at);
      var b = new Date(n2.created_at);
      if (a.getTime() > b.getTime()) {
        return 1;
      } else return -1;
    });
    this.currentFeature = 1
  }
  sortMostPopular(){
    this.videos = [] = this.videos.sort((n1, n2) => {
      var a = n1.view;
      var b = n2.view;
      if (a < b) {
        return 1;
      } else return -1;
    });
    this.currentFeature = 2
  }



}
