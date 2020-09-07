import { Component, OnInit, Input } from '@angular/core';
import { DateServiceService } from '../date-service.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UserService } from '../user.service';
import gql from 'graphql-tag';
import { findPostbyUserId } from '../channel-community-page/channel-community-page.component';

@Component({
  selector: 'app-channel-community-item',
  templateUrl: './channel-community-item.component.html',
  styleUrls: ['./channel-community-item.component.sass']
})
export class ChannelCommunityItemComponent implements OnInit {

  constructor(private dateService:DateServiceService,private apollo:Apollo, public userService:UserService, private router:Router) {
    this.userService.currentUserValueChange.subscribe((value)=>{      
      this.checkCurrentUserFeedBack()
    })
  }
  currentUser:{
    id:String
    name:String
    email: String
    profile_pict: String
    premium: Boolean
    channel_background: String
  }
  @Input() post:{
    id:String
    title:String
    description:String
    media:String    
    user:{
      id:String
      name:String
      email: String
      profile_pict: String
      premium: Boolean
      channel_background: String
    }
    like_post:{
      user_id:String
      post_id:String
      status:Boolean
    }[]
    created_at
  }
  feedback;
  diffDate
  likesCount=0;
  dislikesCount=0;
  ngOnInit(): void {
    this.diffDate = this.dateService.calculateDifference(this.post.created_at)
    this.checkOtherFeedbacks()
    this.currentUser = this.userService.getCurrentUser()
    if(this.currentUser){
      this.checkCurrentUserFeedBack()
    }
  }
  
  giveFeedback(feedback:boolean){
    let isFeedbackBeforeGood = this.feedback == "like" ? true : false
    if(this.currentUser){
      if(!this.feedback){
        this.insertFeedbackPost(feedback)
      }else if (isFeedbackBeforeGood == feedback){
        console.log("dekeete")
        this.deleteFeedbackPost()
      }else{
        console.log("updateee")
        this.updateFeedbackPost(feedback)
      }
    }
  }


  insertFeedbackPost(feedback:boolean){
    this.apollo.mutate({
      mutation: gql
      `mutation createFeedBackOnPost(
          $user_id: String! 
          $post_id: String! 
          $status: Boolean!
        ){
        createFeedBackOnpost(
          input:{
            user_id: $user_id,
            post_id: $post_id,
            status: $status
        }
        ){
          status
        }
      }`,
        variables:{
          user_id: this.currentUser.id,
          post_id: this.post.id,
          status: feedback
        },
        refetchQueries:[{
          query: findPostbyUserId,
          variables: { user_id : this.userService.getChannelUser().id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
  deleteFeedbackPost(){
    this.apollo.mutate({
      mutation: gql
      `mutation deleteFeedBackOnPost(
          $user_id: String! 
          $post_id: String! 
        ){
        deleteFeedbackOnPost(
          user_id: $user_id,
          post_id: $post_id
        )
      }`,
        variables:{
          user_id: this.currentUser.id,
          post_id: this.post.id,          
        },
        refetchQueries:[{
          query: findPostbyUserId,
          variables: { user_id : this.userService.getChannelUser().id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }

  updateFeedbackPost(feedback:boolean){
    this.apollo.mutate({
      mutation: gql
      `mutation updateFeedBackOnPost(
          $user_id: String! 
          $post_id: String! 
          $status: Boolean!
        ){
        updateFeedbackOnPost(
          input:{
            user_id: $user_id,
            post_id: $post_id,
            status: $status
        })
      }`,
        variables:{
          user_id: this.currentUser.id,
          post_id: this.post.id,    
          status: feedback      
        },
        refetchQueries:[{
          query: findPostbyUserId,
          variables: { user_id : this.userService.getChannelUser().id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
  checkCurrentUserFeedBack(){
    this.feedback=null
    this.currentUser = this.userService.getCurrentUser()
    var feedbacks = this.post.like_post
    feedbacks.forEach(element => {
      if(element.user_id == this.currentUser.id){
        if(element.status){
          this.feedback= "like";
        }else{
          this.feedback = "dislike";
        }
      } 
    })
  }
  checkOtherFeedbacks(){
    this.feedback=null
    var feedbacks = this.post.like_post
    feedbacks.forEach(element => {
      if(element.status){
        this.likesCount++;
      }else{
        this.dislikesCount++
      }
    })
  }

}
