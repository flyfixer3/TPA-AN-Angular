import { Component, OnInit} from '@angular/core';
import { UserService } from "../user.service";
import { VideoDetailsService } from '../video-details.service'
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PlaylistsServiceService } from '../playlists-service.service';


@Component({
  selector: 'app-watch-content',
  templateUrl: './watch-content.component.html',
  styleUrls: ['./watch-content.component.sass']
})
export class WatchContentComponent implements OnInit {
  inputComment;
  comments=[];
  length;
  isShow=false;
  defaultProfile= "assets/defaultProfile.png"
  videoID;  
  constructor(private videoDetailsService: VideoDetailsService,private apollo:Apollo, public userService:UserService, private router:Router ,private activity:ActivatedRoute, private playlistService:PlaylistsServiceService) {
    this.videoDetailsService.videosValueChange.subscribe((value)=>{
      this.getVideo(this.videoID)
      this.videos = value
      this.getVideoComment()
      this.checkOtherFeedbacks()
      if(this.currentUser){
        this.checkCurrentUserFeedBack()
      }
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    this.userService.currentUserValueChange.subscribe((value)=>{      
      this.checkCurrentUserFeedBack()
    })
  }
  currentUser:{
    id:String
    name:String
    profile_pict:String
    email:String
    channel_background:String
    premium:boolean
    subscribers:{
      id:String
      target_id:String
      subscriber_id:String
      notification:Boolean
    }[]
  }
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
      id:String
      name:String
      profile_pict:String
      subscribers:{
        id:String
        target_id:String
        subscriber_id:String
        notification:Boolean
      }[]

    }
    like_video:{
      user_id:String
      video_id:String
      status:Boolean
    }[]
  };
  comment = {
    user_id: "3d9dccc5-a7ee-4257-9391-459ba59fac87",
    video_id: "0002befd-49f8-4e57-bfcd-c086c3babed2",
    parent_id: "4b621a11-fc7c-466a-a749-481620411b53",
    reply_to: "onmyway",
    comment: "For Godsake, WTH !"
  }
  lastKey;
  observer
  videos:any[];
  feedback = null;
  likesCount = 0;
  dislikeCount = 0
  index;
  playlist:{
    playlist_id:String
    priority:BigInteger
    video:{
      id:String
      title:String
      thumbnail:String
      description:String
      view:BigInteger
      created_at:Date
      user:{
        id:String
        name:String
        profile_pict
      }
    }
  }[]
  ngOnInit(): void {
    this.videoID = this.activity.snapshot.paramMap.get('id').toString()
    if(this.videoDetailsService.checkIsReady()){  
      this.getVideo(this.videoID)
      this.getVideoComment()
      this.checkOtherFeedbacks()
    }
    this.index = this.activity.snapshot.paramMap.get('index').toString()
    if(this.index != -1){
      this.playlist = this.playlistService.getPlaylistVideo()
    }
    
    if(this.userService.getCurrentUser()){
      this.checkCurrentUserFeedBack()
    }
    this.videos = this.videoDetailsService.getVideos()
    
  }

  watchVideoNext(){
    this.router.navigateByUrl("watch/"+this.videos[0].id+"/playlist/"+ -1)
  }
  giveFeedback(feedback:boolean){
    let isFeedbackBeforeGood = this.feedback == "like" ? true : false
    console.log(this.feedback)
    console.log(feedback)
    if(this.currentUser){
      if(!this.feedback){
        console.log("inserteddd")
        this.insertFeedbackVideo(feedback)
      }else if (isFeedbackBeforeGood == feedback){
        console.log("dekeete")
        this.deleteFeedbackVideo()
      }else{
        console.log("updateee")
        this.updateFeedbackComment(feedback)
      }
    }
  }
  checkCurrentUserFeedBack(){
    this.feedback=null
    this.currentUser = this.userService.getCurrentUser()
    var feedbacks = this.video.like_video
    feedbacks.forEach(element => {
      if(element.user_id == this.currentUser.id){
        if(element.status){
          this.feedback = "like";
        }else{
          this.feedback = "dislike";
        }
      } 
    })
  }
  checkOtherFeedbacks(){
    this.feedback=null
    this.likesCount = 0 
    this.dislikeCount = 0 
    var feedbacks = this.video.like_video
    feedbacks.forEach(element => {
      if(element.status){
        this.likesCount++
      }else{
        this.dislikeCount++
      }
    })
  }


  insertFeedbackVideo(feedback:boolean){
    this.apollo.mutate({
      mutation: gql
      `mutation createFeedBackOnVideo(
          $user_id: String! 
          $video_id: String! 
          $status: Boolean!
        ){
        createFeedBackOnVideo(
          input:{
            user_id: $user_id,
            video_id: $video_id,
            status: $status
        }
        ){
          status
        }
      }`,
        variables:{
          user_id: this.currentUser.id,
          video_id: this.video.id,
          status: feedback
        },
        refetchQueries:[{
          query: queryGetVideos,
          variables: { repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
  deleteFeedbackVideo(){
    this.apollo.mutate({
      mutation: gql
      `mutation deleteFeedbackOnVideo(
          $user_id: String! 
          $video_id: String! 
        ){
        deleteFeedbackOnVideo(
          user_id: $user_id,
          video_id: $video_id
        )
      }`,
        variables:{
          user_id: this.currentUser.id,
          video_id: this.video.id,          
        },
        refetchQueries:[{
          query: queryGetVideos,
          variables: { repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }

  updateFeedbackComment(feedback:boolean){
    this.apollo.mutate({
      mutation: gql
      `mutation updateFeedBackOnVideo(
          $user_id: String! 
          $video_id: String! 
          $status: Boolean!
        ){  
        updateFeedbackOnVideo(
          input:{
            user_id: $user_id,
            video_id: $video_id,
            status: $status
        })
      }`,
        variables:{
          user_id: this.currentUser.id,
          video_id: this.video.id,    
          status: feedback      
        },
        refetchQueries:[{
          query: queryGetVideos,
          variables: { repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }

  createComment(){
    this.comment.user_id = this.userService.getCurrentUser().id.toString()
    this.comment.video_id = this.video.id.toString()
    this.comment.parent_id = ""
    this.comment.reply_to = ""
    this.comment.comment = this.inputComment
    console.log(this.comment)
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
          newComment: this.comment
        },
        refetchQueries:[{
          query: queryGetCommentsByVideoId,
          variables: { id : this.video.id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }

  getVideo(id:String){
    this.video = this.videoDetailsService.getVideo(id)
  }
  getVideoComment(){
    this.apollo.watchQuery<any>({
      query: queryGetCommentsByVideoId,
      variables:{
        id: this.video.id,
      },
    }).valueChanges.subscribe((result)=>{
      this.comments = result.data.commentsByVideoId
      this.length = this.comments.length
    })
  }
  toggleModal(){
    if(!this.isShow){
      (document.getElementById("link-id") as HTMLInputElement).value = location.href
      this.isShow = true
    }else{
      this.isShow = false
    }
    
  }
  copyToClipBoard(){
    var text = (document.getElementById("link-id")) as HTMLInputElement
    text.select()
    text.setSelectionRange(0, 999999)
    document.execCommand('copy')
  }
  shareOnTwitter(){
    var text = (document.getElementById("link-id")) as HTMLInputElement
    var post = 'https://twitter.com/intent/tweet?text=' + text.value;
    window.open(post, '_blank');
  }
}

export const queryGetCommentsByVideoId = gql
  `query getComments($id: String!){
    commentsByVideoId(id: $id){
      id
      parent_id
      video_id
      comment
      reply_to
      user{
        id
        name
        profile_pict
      }
      created_at
      like_comment{
        user_id
        status
        comment_id
      }
    }
  }`
  export const queryGetVideos = gql
  `query getVideos{
      videos{
        id,
        link,
        title,
        thumbnail,
        description,
        view,
        created_at,
        location{
          id,
          name
        }
        user{
          id,
          name,
          email,
          profile_pict,
          premium,
          channel_background
          subscribers{
            id,
            target_id,
            subscriber_id,
            notification
          }
        }
        like_video{
          user_id
          video_id
          status
        }
      }
    }`