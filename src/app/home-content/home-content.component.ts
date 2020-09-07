import { Component, OnInit, Query } from '@angular/core';
import {Apollo} from 'apollo-angular'
import { VideoDetailsService } from '../video-details.service'
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.sass']
})
export class HomeContentComponent implements OnInit {

  constructor(private apollo:Apollo, public videoService:VideoDetailsService) { 
    videoService.videosValueChange.subscribe((value)=>{
      this.videos = this.videoService.getVideos()
      this.videoService.shuffle(this.videos)
    })
  }
  lastKey;
  observer 
  videos;

  ngOnInit(): void {
    this.videos = this.videoService.getVideos()
    this.lastKey = 12;
    this.observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        if(this.videoService.checkIsReady()){
          let main = document.querySelector('.video__grid');
          for (let i = 0; i < 4; i++) {
            if (this.lastKey < this.videos?.length) {
              let div = document.createElement('div');
              let video = document.createElement('app-video');
              video.setAttribute('video', 'this.videos[this.lastKey]');
              div.appendChild(video);
              main.appendChild(div);
              this.lastKey++;
            }
          }
        }        
      }
    });
    this.observer.observe(document.querySelector('.end-point'));    
  }

}
