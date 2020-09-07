import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Timestamp } from 'rxjs';
import { Time } from '@angular/common';
import {VideoDetailsService} from '../video-details.service'
import {DateServiceService} from '../date-service.service'
import { UserService } from '../user.service';
import { PlaylistsServiceService } from '../playlists-service.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { queryGetAllCurrentUserPlaylist } from '../side-bar/side-bar.component';
import { queryGetVideos } from '../watch-content/watch-content.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass']
})
export class VideoComponent implements OnInit {
  diffDate:String
  currentUser;
  playlists:{
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
  }[]
  constructor(public userService:UserService, private dateService:DateServiceService, public playlistService:PlaylistsServiceService, private apollo:Apollo) { 
    userService.currentUserValueChange.subscribe((value)=>{
      this.currentUser = this.userService.getCurrentUser()
      this.playlists = playlistService.getPlaylists()
    })
    playlistService.playlistsValueChange.subscribe(()=>{
      if(this.currentUser){
        this.playlists = playlistService.getPlaylistsByUserId(this.currentUser.id)
        console.log(this.currentUser.id)
      }
    })
  }

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
  };
  isShow;
  isPrivacyModalShow;
  isPlaylistShow;
  inputTitle;
  isPrivate;
  currentAccess;
  isCreateNewPlaylist;
  checkList;
  test
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.isShow = false;
    this.isPlaylistShow = false
    this.isPrivacyModalShow = false
  }
  toggleShowHidePrivacyModal($event){
    $event.stopPropagation()
    this.isPrivacyModalShow = !this.isPrivacyModalShow;
  }
  setChannelUser(user:any){
    this.userService.setChannelUser(user)
  }
  toggleShowHideSaveModal($event){
    $event.stopPropagation()
    this.isPlaylistShow = !this.isPlaylistShow
  }
  answerProvided(e){
    if(e.target.checked){
      this.isCreateNewPlaylist = false;
      console.log(e.target.value)      
      this.findVideoPriorityOnPlaylist(e.target.value)
    }else{
      this.deleteVideoOnPlaylist(e.target.value)
    }
  }
  toggleCreateNewPlaylist(){
    this.isCreateNewPlaylist = !this.isCreateNewPlaylist;
  }

  toggleShowHideModal($event){
    $event.stopPropagation()
    this.isShow = !this.isShow;
  }
  prior;
  createPlaylist(){
    this.apollo.mutate({
      mutation: createPlaylist,
        variables:{
          user_id: this.userService.getCurrentUser().id,
          title: this.inputTitle,
          description: "",
          private: this.isPrivate,
          view: 125000,
        },
        refetchQueries:[{
          query: queryGetAllCurrentUserPlaylist,
          variables: { id :"", repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }

  insertVideoOnPlaylist(playlist_id, priority){
    console.log(priority)
    this.apollo.mutate({
      mutation: insertVideoOnPlaylist,
        variables:{
          playlist_id: playlist_id,
          video_id: this.video.id,
          priority: priority
        }
      }).subscribe();
  }
  findVideoPriorityOnPlaylist(playlist_id){
    console.log(playlist_id)
    this.apollo.watchQuery<any>({
      query: findVideoPriority,
      variables:{
        playlist_id: playlist_id,
      },
    }).valueChanges.subscribe((result)=>{
        console.log(result)
        this.prior = 1
        if(result.data.getVideoPriorityByPlaylistId.length > 0){
          var lastIndex;
          lastIndex = result.data.getVideoPriorityByPlaylistId?.length
          this.prior = result.data.getVideoPriorityByPlaylistId[lastIndex - 1].priority + 1
        }
        this.insertVideoOnPlaylist(playlist_id, this.prior)
    })  
  }
  deleteVideoOnPlaylist(playlist_id){
    this.apollo.mutate({
      mutation: deleteVideoOnPlaylist,
        variables:{
          playlist_id: playlist_id,
          video_id: this.video.id
        }
      }).subscribe();
  }
  deleteVideo(){
    this.apollo.mutate({
      mutation: deleteVideo,
        variables:{
          id: this.video.id
        },
        refetchQueries:[{
          query: queryGetVideos,
          variables: { repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
}

export const findVideoPriority = gql 
`query getVideoPriorityByPlaylistId($playlist_id: String!){
  getVideoPriorityByPlaylistId(playlist_id: $playlist_id){
    priority
  }
}`
export const insertVideoOnPlaylist = gql
`mutation insertVideoOnPlaylist(
    $playlist_id: String! 
    $video_id: String! 
    $priority: Int!
  ){
  insertVideoOnPlaylist(
    input:{
      playlist_id: $playlist_id,
      video_id: $video_id,
      priority: $priority,
    }
  )
}`

export const createPlaylist = gql
`mutation createPlaylist(
    $user_id: String! 
    $title: String! 
    $description: String
    $private: Boolean!
    $view: Int!
  ){
  createPlaylist(
    input:{
      user_id: $user_id,
      title: $title,
      description: $description,
      private: $private,
      view: $view,
    }
  ){
    title
  }
}`

export const deleteVideoOnPlaylist = gql
`mutation deleteVideoOnPlaylist(
    $playlist_id: String! 
    $video_id: String! 
  ){
    deleteVideoOnPlaylist(
      playlist_id: $playlist_id,
      video_id: $video_id,
    )
  }`

export const deleteVideo = gql
`mutation deleteVideo(
    $id: String! 
  ){
    deleteVideo(
      id: $id
    )
  }`
