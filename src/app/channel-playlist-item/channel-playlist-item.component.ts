import { Component, OnInit , Input} from '@angular/core';
import { DateServiceService } from '../date-service.service';

@Component({
  selector: 'app-channel-playlist-item',
  templateUrl: './channel-playlist-item.component.html',
  styleUrls: ['./channel-playlist-item.component.sass']
})
export class ChannelPlaylistItemComponent implements OnInit {

  constructor(private dateService:DateServiceService) { }
  @Input() playlist:{
    id:String
    title:String
    description:String
    private:Boolean
    view:Number
    updated_at:Date
    user:{
      id:String
      profile_pict:String
      name:String
    }
    videos:{
      id:String
      title:String
      thumbnail:String
      user:{
        id:String
        name:String
      }
    }[]
  }
  diffDate;
  ngOnInit(): void {
    this.diffDate = this.dateService.calculateDifference(this.playlist.updated_at)
  }

}
