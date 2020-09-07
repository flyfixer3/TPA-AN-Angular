import { Component, OnInit, Input } from '@angular/core';
import {VideoDetailsService} from '../video-details.service'
import {DateServiceService} from '../date-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-relate-video',
  templateUrl: './relate-video.component.html',
  styleUrls: ['./relate-video.component.sass']
})
export class RelateVideoComponent implements OnInit {

  diffDate:String
  constructor(private videoDetailService:VideoDetailsService, private dateService:DateServiceService, private router:Router) { }

  ngOnInit(): void {
    this.diffDate = this.dateService.calculateDifference(this.video.created_at)
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
    like_video:{
      user_id:String
      video_id:String
      status:Boolean
    }
  };

  watchVideo(){
    this.router.navigateByUrl("watch/"+this.video.id+"/playlist/"+ -1)
  }

}
