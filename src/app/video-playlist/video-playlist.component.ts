import { Component, OnInit ,Input, HostListener, OnChanges} from '@angular/core';
import { DateServiceService } from '../date-service.service';
import { UserService } from '../user.service';
import { Apollo } from 'apollo-angular';
import { findVideoPriority, deleteVideoOnPlaylist, insertVideoOnPlaylist, createPlaylist, deleteVideo } from '../video/video.component';
import { queryGetAllCurrentUserPlaylist } from '../side-bar/side-bar.component';
import { queryGetVideos } from '../watch-content/watch-content.component';
import { PlaylistsServiceService } from '../playlists-service.service';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.sass']
})
export class VideoPlaylistComponent implements OnInit,OnChanges {

  constructor(private dateService:DateServiceService,public userService:UserService, private apollo:Apollo, public playlistService:PlaylistsServiceService, private router:Router) {
    this.playlistService.playlistsValueChange.subscribe(()=>{
      console.log("test")
      
    })
  }
  @Input() index;
  @Input() video:{
    id:String
    title:String
    thumbnail:String
    description:String
    view:BigInteger
    created_at:Date
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
      created_at:Date
      user:{
        id:String
        name:String
      }
    }
  }
  diffDate
  priority
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
  ngOnChanges(): void{
    console.log("Test")
    if(this.playlistService.newPrior && this.playlistService.oldPrior){
      this.apollo.mutate({
        mutation: queryUpdateVideoOnPlaylist,
          variables:{
            playlist_id: this.playlistService.newPrior.playlist_id,
            video_id: this.playlistService.newPrior.video_id,
            priority: this.playlistService.oldPrior.priority
          },
          refetchQueries:[{
            query: queryGetAllCurrentUserPlaylist,
            variables: { id :"", repoFullName: 'apollographql/apollo-client' },
          }]
        }).subscribe(()=>{
          this.playlistService.newPrior = ""
          this.playlistService.oldPrior = ""
        });
    }
  }
  ngOnInit(): void {
    if(this.playlistVideo){
      console.log(this.playlistVideo)
      this.video = this.playlistVideo.video
    }
    this.diffDate = this.dateService.calculateDifference(this.video.created_at)
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
  updatePriorityUp(){
    var playlistVideo:any[] = this.playlistService.getPlaylistVideo()
    if(this.index == 0){
      return
    }
    this.playlistService.newPrior = playlistVideo[this.index-1]
    this.playlistService.oldPrior = playlistVideo[this.index]
    
    this.updateVideoOnPlaylist(this.playlistService.oldPrior.playlist_id,this.playlistService.oldPrior.video.id,this.playlistService.newPrior.priority)
  }
  prior;
  watchVideo(){
    this.router.navigateByUrl("watch/"+this.playlistVideo.video.id+"/playlist/"+(this.index + 1))
  }
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
        },
        refetchQueries:[{
          query: queryGetAllCurrentUserPlaylist,
          variables: { id :"", repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
 
  updateVideoOnPlaylist(playlist_id, video_id, priority){
    console.log(priority)
    this.apollo.mutate({
      mutation: queryUpdateVideoOnPlaylist,
        variables:{
          playlist_id: playlist_id,
          video_id: video_id,
          priority: priority
        },
        refetchQueries:[{
          query: queryGetAllCurrentUserPlaylist,
          variables: { id :"", repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe(()=>{
        
      });
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
        },
        refetchQueries:[{
          query: queryGetAllCurrentUserPlaylist,
          variables: { id :"", repoFullName: 'apollographql/apollo-client' },
        }]
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

export const queryUpdateVideoOnPlaylist = gql
`mutation updateVideoOnPlaylist(
    $playlist_id: String! 
    $video_id: String! 
    $priority: Int!
  ){
  updateVideoOnPlaylist(
    playlist_id: $playlist_id,
    video_id: $video_id,
    input:{
      priority: $priority,  
    }
  )
}`
