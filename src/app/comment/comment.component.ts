import { Component, OnInit, Input} from '@angular/core';
import {DateServiceService} from '../date-service.service'
import { UserService } from "../user.service";
import { VideoDetailsService } from '../video-details.service'
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { queryGetCommentsByVideoId } from '../watch-content/watch-content.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit {
  inputComment;
  likesCount = 0
  dislikesCount = 0
  feedback = null;
  constructor(private dateService:DateServiceService, private videoDetailsService: VideoDetailsService,private apollo:Apollo, public userService:UserService, private router:Router) { 
    this.userService.currentUserValueChange.subscribe((value)=>{      
      this.checkCurrentUserFeedBack()
    })
  }
  diffDate;
  currentUser:{
    id:String
    name:String
    profile_pict:String
    email:String
    channel_background:String
    premium:boolean
  }
  @Input() comment:{
    id:String
    parent_id:String
    video_id:String
    reply_to:String
    comment:String
    user:{
      id:String
      name:String
      profile_pict:String
    }
    created_at:Date
    like_comment:{
      user_id:String
      comment_id:String
      status:Boolean
    }[]
  };
  replyComment = {
    user_id: "3d9dccc5-a7ee-4257-9391-459ba59fac87",
    video_id: "0002befd-49f8-4e57-bfcd-c086c3babed2",
    parent_id: "4b621a11-fc7c-466a-a749-481620411b53",
    reply_to: "onymyway",
    comment: "For Godsake, WTH !"
  }
  
  ngOnInit(): void {
    this.diffDate = this.dateService.calculateDifference(this.comment.created_at)
    this.checkOtherFeedbacks()
    this.currentUser = this.userService.getCurrentUser()
    if(this.currentUser){
      this.checkCurrentUserFeedBack()
    }
  }
  hide:Boolean = true
  showHideReply(){
    if(!this.hide){
      this.hide=true
    }else
      this.hide= false
  }

  giveFeedback(feedback:boolean){
    let isFeedbackBeforeGood = this.feedback == "like" ? true : false
    console.log(this.feedback)
    console.log(feedback)
    if(this.currentUser){
      if(!this.feedback){
        this.insertFeedbackComment(feedback)
      }else if (isFeedbackBeforeGood == feedback){
        console.log("dekeete")
        this.deleteFeedbackComment()
      }else{
        console.log("updateee")
        this.updateFeedbackComment(feedback)
      }
    }
  }


  insertFeedbackComment(feedback:boolean){
    this.apollo.mutate({
      mutation: gql
      `mutation createFeedBackOnComment(
          $user_id: String! 
          $comment_id: String! 
          $status: Boolean!
        ){
        createFeedBackOnComment(
          input:{
            user_id: $user_id,
            comment_id: $comment_id,
            status: $status
        }
        ){
          status
        }
      }`,
        variables:{
          user_id: this.currentUser.id,
          comment_id: this.comment.id,
          status: feedback
        },
        refetchQueries:[{
          query: queryGetCommentsByVideoId,
          variables: { id : this.comment.video_id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
  deleteFeedbackComment(){
    this.apollo.mutate({
      mutation: gql
      `mutation deleteFeedBackOnComment(
          $user_id: String! 
          $comment_id: String! 
        ){
        deleteFeedbackOnComment(
          user_id: $user_id,
          comment_id: $comment_id
        )
      }`,
        variables:{
          user_id: this.currentUser.id,
          comment_id: this.comment.id,          
        },
        refetchQueries:[{
          query: queryGetCommentsByVideoId,
          variables: { id : this.comment.video_id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }

  updateFeedbackComment(feedback:boolean){
    this.apollo.mutate({
      mutation: gql
      `mutation updateFeedBackOnComment(
          $user_id: String! 
          $comment_id: String! 
          $status: Boolean!
        ){
        updateFeedbackOnComment(
          input:{
            user_id: $user_id,
            comment_id: $comment_id,
            status: $status
        })
      }`,
        variables:{
          user_id: this.currentUser.id,
          comment_id: this.comment.id,    
          status: feedback      
        },
        refetchQueries:[{
          query: queryGetCommentsByVideoId,
          variables: { id : this.comment.video_id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
  checkCurrentUserFeedBack(){
    this.feedback=null
    this.currentUser = this.userService.getCurrentUser()
    var feedbacks = this.comment.like_comment
    console.log("succes!!!!")
    console.log(this.currentUser)
    console.log(feedbacks)
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
    var feedbacks = this.comment.like_comment
    console.log("testsadas")
    console.log(this.feedback)
    feedbacks.forEach(element => {
      if(element.status){
        this.likesCount++;
      }else{
        this.dislikesCount++
      }
    })
  }
  createComment(){
    this.replyComment.user_id = this.currentUser.id.toString()
    this.replyComment.video_id = this.comment.video_id.toString()
    this.replyComment.parent_id = this.comment.parent_id ? this.comment.parent_id.toString() : this.comment.id.toString()
    this.replyComment.reply_to = this.comment.parent_id ? this.comment.user.name.toString() : ""
    this.replyComment.comment = this.inputComment
    console.log(this.replyComment)
    this.insertComment()
  }
  
  insertComment(): void{
    this.apollo.mutate({
      mutation: gql
      `mutation insertComment($newComment: NewComment!){
        createComment(input: $newComment
        ){
          id
        }
      }`,
        variables:{
          newComment: this.replyComment
        },
        refetchQueries:[{
          query: queryGetCommentsByVideoId,
          variables: { id : this.comment.video_id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
  
  
}
