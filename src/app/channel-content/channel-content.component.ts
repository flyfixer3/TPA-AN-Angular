import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { VideoDetailsService } from '../video-details.service'
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { queryGetVideos } from '../watch-content/watch-content.component';
import { findUser } from '../user-features-bar/user-features-bar.component';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.sass']
})
export class ChannelContentComponent implements OnInit {

  constructor(public userService:UserService,private videoDetailService:VideoDetailsService, private router:Router ,private activity:ActivatedRoute, private apollo:Apollo) {
    this.userService.currentUserValueChange.subscribe(()=>{
      this.checkCurrentUserSubscriber()
    })
    this.userService.channelUserValueChange.subscribe((value)=>{
      this.channelUser = value
      console.log(this.channelUser)
      if(this.currentUser)
        this.checkCurrentUserSubscriber()
    })
  }
  channelUser:{
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
  }
  subscriber = false;
  notification = false;
  userID:String
  currentUser;  
  subcriberCount;
  ngOnInit(): void {
    if(this.userService.channelUser){
      this.channelUser = this.userService.getChannelUser()      
    }else{
      this.findChannelUser()
    }
    this.currentUser = this.userService.getCurrentUser()    
    if(this.currentUser) this.checkCurrentUserSubscriber()
  }
  checkCurrentUserSubscriber(){
    this.currentUser = this.userService.getCurrentUser()
    var subscribers = this.currentUser.subscribers
    subscribers?.forEach(element => {
      console.log(element.target_id)
      console.log(this.channelUser.id)
      if(element.target_id == this.channelUser.id){
        this.subscriber = true
        if(element.notification){
          this.notification = true
        }else{
          this.notification = false
        }
      }
    })
  }
  
  ToggleSubscriber(){
    if(this.currentUser){
      if(!this.subscriber){
        this.insertSubscriber()
      }else{
        this.deleteSubscriber()
      }
    }
  }
  ToggleNotification(){
    if(this.currentUser){
      if(this.subscriber){
        this.updateNotification(!this.notification)
      } 
    }
  }

  findChannelUser() {
    this.userID = this.activity.snapshot.paramMap.get('id').toString()
    this.apollo.watchQuery<any>({
      query: findUserById,
        variables:{
          id : this.userID,
        },
    }).valueChanges.subscribe((result)=>{
        this.channelUser = result.data.findUserById[0]
        this.subcriberCount = result.data.findUserById[0].subscribers?.length
        this.userService.setChannelUser(this.channelUser)
    })
  }
  insertSubscriber(){
    this.apollo.mutate({
      mutation: gql
      `mutation createSubscriber(
          $target_id: String! 
          $subscriber_id: String! 
          $notification: Boolean!
        ){
        createSubscriber(
          input:{
            target_id: $target_id,
            subscriber_id: $subscriber_id,
            notification: $notification
        }
        ){
          notification
        }
      }`,
        variables:{
          target_id: this.channelUser.id,
          subscriber_id: this.currentUser.id,
          notification: false
        },
        refetchQueries:[{
          query: findUser,
          variables: { email : this.currentUser.email,repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe(()=>{
        this.subcriberCount++
      });
  }

  updateNotification(responNotification:Boolean){
    this.apollo.mutate({
      mutation: gql
      `mutation updateSubscriber(
          $target_id: String! 
          $subscriber_id: String! 
          $notification: Boolean!
        ){
        updateSubscriber(
          input:{
            target_id: $target_id,
            subscriber_id: $subscriber_id,
            notification: $notification
        })
      }`,
        variables:{
          target_id: this.channelUser.id,
          subscriber_id: this.currentUser.id,
          notification: responNotification      
        },
        refetchQueries:[{
          query: findUser,
          variables: { email : this.currentUser.email, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }

  deleteSubscriber(){
    this.apollo.mutate({
      mutation: gql
      `mutation deleteSubscriber(
          $target_id: String! 
          $subscriber_id: String!  
        ){
        deleteSubscriber(
          target_id: $target_id,
          subscriber_id: $subscriber_id,
        )
      }`,
        variables:{
          target_id: this.channelUser.id,
          subscriber_id: this.currentUser.id,          
        },
        refetchQueries:[{
          query: findUser,
          variables: { email : this.currentUser.email, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe(()=>{
        this.subscriber = false
        this.notification = false
        this.subcriberCount--;
      });
  }
}
export const findUserById = gql
`query findUserById($id: String!){
    findUserById(id: $id){
      id
      name
      email
      profile_pict
      channel_background
      premium
      subscribers{
        id
        target_id
        subscriber_id
        notification
      }
    }
  }`