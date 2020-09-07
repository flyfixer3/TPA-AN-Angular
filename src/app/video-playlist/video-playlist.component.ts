import { Component, OnInit ,Input} from '@angular/core';
import { DateServiceService } from '../date-service.service';
import { UserService } from '../user.service';
import { Apollo } from 'apollo-angular';
import { findVideoPriority } from '../video/video.component';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.sass']
})
export class VideoPlaylistComponent implements OnInit {

  constructor(private dateService:DateServiceService,public userService:UserService, private apollo:Apollo) { }
  @Input() video:{
    id:String
    title:String
    thumbnail:String
    description:String
    view:BigInteger
    created_at
    user:{
      id:String
      name:String
    }
  }
  @Input() playlistVideo:{
    playlist_id:String
    priority:BigInteger
    video:{
      id:String
      title:String
      thumbnail:String
      description:String
      view:BigInteger
      created_at
      user:{
        id:String
        name:String
      }
    }
  }
  diffDate
  priority
  ngOnInit(): void {
    this.diffDate = this.dateService.calculateDifference(this.video.created_at)
    if(this.playlistVideo){
      this.video = this.playlistVideo.video
    }
  }
}
