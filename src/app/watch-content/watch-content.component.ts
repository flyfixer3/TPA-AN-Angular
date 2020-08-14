import { Component, OnInit } from '@angular/core';
import { VideoDetailsService } from '../video-details.service'
import { UserService } from "../user.service";
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-watch-content',
  templateUrl: './watch-content.component.html',
  styleUrls: ['./watch-content.component.sass']
})
export class WatchContentComponent implements OnInit {
  comments;
  length;
  defaultProfile= "assets/defaultProfile.png"
  currentUser:any
  constructor(private videoDetailsService: VideoDetailsService,private apollo:Apollo, private userService:UserService ) { }
  video:{
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
  ngOnInit(): void {
    this.getVideo()
    this.getVideoComment()
    this.currentUser = this.userService.getCurrentUser()
    console.log("curr User :")
    console.log(this.currentUser)
  }
  getVideo(){
    this.video = this.videoDetailsService.getVideo()
  }
  getVideoComment(){
    console.log("test")
    console.log(this.video)
    this.apollo.watchQuery<any>({
      query: gql
      `query getComments($id: String!){
        commentsByVideoId(id: $id){
          id
          parent_id
          comment
          user{
            id
            name
            profile_pict
          }
          created_at
        }
      }`,
      variables:{
        id : "0002befd-49f8-4e57-bfcd-c086c3babed2",
      },
    }).valueChanges.subscribe((result)=>{
      this.comments = result.data.commentsByVideoId
      this.length = this.comments.length
    })
  }
}
