import { Component, OnInit } from '@angular/core';
import { VideoDetailsService } from '../video-details.service';

@Component({
  selector: 'app-trend-content',
  templateUrl: './trend-content.component.html',
  styleUrls: ['./trend-content.component.sass']
})
export class TrendContentComponent implements OnInit {

  constructor(private videoService:VideoDetailsService) { 
    videoService.videosValueChange.subscribe((value)=>{
      this.videos = this.getTrendingVideo(value)
    })
  }
  videos:any[];
  ngOnInit(): void {
    this.videos = this.getTrendingVideo(this.videoService.getVideos())
  }
  getTrendingVideo(videos:any[]) {
    if(videos.length < 2) return videos
    let currDate = new Date();
    let oneDay = 24 * 60 * 60 * 1000;
    var channelVideos = videos.filter((value)=>((currDate.getTime() - (new Date(value.created_at)).getTime())/oneDay) <= 7 )
    channelVideos = [] = channelVideos.sort((n1, n2) => {
      if (n1.view > n2.view) {
        return 1;
      } else return -1;
    });
    return channelVideos
  }



}
