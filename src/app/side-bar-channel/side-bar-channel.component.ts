import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-channel',
  templateUrl: './side-bar-channel.component.html',
  styleUrls: ['./side-bar-channel.component.sass']
})
export class SideBarChannelComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) {}

  ngOnInit(): void {
  }
  @Input() channelUser:{
    id:String
    name:String
    profile_pict:String
    email:String
    channel_background:String
    premium:boolean
    subscribers:{
      id:String
      target_id:String
      target:any
      subscriber_id:String
      notification:Boolean
    }[]
  }

}
