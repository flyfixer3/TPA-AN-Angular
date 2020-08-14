import { Component, OnInit, Input } from '@angular/core';
import { Timestamp } from 'rxjs';
import { Time } from '@angular/common';
import {VideoDetailsService} from '../video-details.service'
import {DateServiceService} from '../date-service.service'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass']
})
export class VideoComponent implements OnInit {
  diffDate:String
  constructor(private videoDetailService:VideoDetailsService, private dateService:DateServiceService) { }

  ngOnInit(): void {
    this.diffDate = this.dateService.calculateDifference(this.video.created_at)
  }
  setVideo(video:any){
    this.videoDetailService.setVideo(video)
  }
  

  @Input() video:{
    id:String;
    link:String;
    title:String
    thumbnail:String
    description:String
    view:BigInteger
    created_at:Date
    location:{
      id:String
      name:String
    }
    user:{
      name:String
      profile_pict:String
    }
  };

}
