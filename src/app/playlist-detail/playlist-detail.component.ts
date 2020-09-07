import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { PlaylistsServiceService } from '../playlists-service.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { queryGetAllCurrentUserPlaylist } from '../side-bar/side-bar.component';
import { DateServiceService } from '../date-service.service';
import { UserService } from '../user.service';
import gql from 'graphql-tag';
import { findVideoPriority } from '../video/video.component';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.sass']
})
export class PlaylistDetailComponent implements OnInit {

  @ViewChild('desc') desc: ElementRef;
  @ViewChild('title') title: ElementRef;
  inputTitle:String = "";
  inputDescription:String = "tes";
  isShow;
  diffDate:String
  constructor(private playlistService:PlaylistsServiceService,private router:Router ,private activity:ActivatedRoute, private apollo:Apollo, private dateService:DateServiceService, private userService:UserService) { 
    playlistService.playlistsValueChange.subscribe(()=>{
      console.log("test")
      this.playlist = this.userService.getCurrentUser()?.save_playlists.filter((playlist)=> playlist.id == this.playlistID)[0]
      this.isCreator= false
      if(!this.playlist){
        this.isCreator = true
        this.playlistService.setPlaylist(this.playlistID)      
        this.playlist = this.playlistService.getPlaylist()
      }
      this.isPrivate = this.playlist?.private
      this.inputTitle = this.playlist.title
      this.inputDescription = this.playlist.description ? this.playlist.description : ""
      this.diffDate = this.dateService.calculateDifference(this.playlist?.updated_at)
      this.findVideoPriorityOnPlaylist(this.playlistID)
    })
    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     // trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //     // if you need to scroll back to top, here is the right place
    //     window.scrollTo(0, 0);
    //   }
    // });
  }
  playlistID
  currentAccess;
  playlist:{
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
  videos:{
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
  isPrivate:Boolean;
  isCreator:Boolean;
  lastKey;
  observer
  ngOnInit(): void {
    this.playlistID = this.activity.snapshot.paramMap.get('id').toString()
    if(this.userService.getCurrentUser()) this.getAllCurrentUserPlaylists(this.userService.getCurrentUser()?.id)
    this.playlist = this.userService.getCurrentUser()?.save_playlists.filter((playlist)=> playlist.id == this.playlistID)[0]
    this.isCreator= false
    if(!this.playlist){
      this.isCreator = true
      this.playlistService.setPlaylist(this.playlistID)      
      this.playlist = this.playlistService.getPlaylist()
    }
    this.diffDate = this.dateService.calculateDifference(this.playlist?.updated_at)
    this.isPrivate = this.playlist?.private
    this.inputTitle = this.playlist?.title
    this.inputDescription = this.playlist?.description
    this.findVideoPriorityOnPlaylist(this.playlistID)
    this.lastKey = 8;
    this.observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
          let main = document.querySelector('.playlist__grid');
          if (this.lastKey < this.videos?.length) {
            let div = document.createElement('div');
            let video = document.createElement('app-video-playlist');
            video.setAttribute('playlistVideo', 'this.videos[this.lastKey]');
            div.appendChild(video);
            main.appendChild(div);
            this.lastKey++;
          }
        }        
      }
    );
    this.observer.observe(document.querySelector('.end-point'));    
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.isShow = false;
  }

  
  findVideoPriorityOnPlaylist(playlist_id){
    console.log(playlist_id)
    this.apollo.watchQuery<any>({
      query: findVideoPriority,
      variables:{
        playlist_id: playlist_id,
      },
    }).valueChanges.subscribe((result)=>{
      this.videos = result.data.getVideoPriorityByPlaylistId
      this.playlistService.setPlaylistVideo(this.videos)
    })  
  }
  toggleShowHideModal($event){
    $event.stopPropagation()
    this.isShow = !this.isShow;
  }
  toggleEditTitle(){
    this.inputTitle = this.playlist.title.toString()
    this.title.nativeElement.focus()
  }
  toggleEditDescription(){
    this.inputDescription= this.playlist.description.toString()
    this.desc.nativeElement.focus()
  }
  setPrivacy(privacy){
    if(privacy != this.playlist?.private)
    {
      this.isPrivate = !this.playlist?.private
      this.updatePlaylist()
    }
  }
  
  getAllCurrentUserPlaylists(userID:String){
    this.apollo.watchQuery<any>({
      query: queryGetAllCurrentUserPlaylist,
      variables:{
        id:userID
      }
    }).valueChanges.subscribe((result)=>{
      this.playlistService.setPlaylists(result.data.findPlaylistByUserId)
    })
   }
  updatePlaylist(){
    console.log(this.playlist.id)
    console.log(this.playlist.user.id)
    console.log(this.inputTitle)
    console.log(this.inputDescription)
    console.log(this.isPrivate)
    this.apollo.mutate({
      mutation: queryUpdatePlaylist,
        variables:{          
          playlist_id: this.playlist.id,
          user_id: this.playlist.user.id,
          title: this.inputTitle,
          description: this.inputDescription,
          private: this.isPrivate,
          view: 120002,
        },
        refetchQueries:[{
          query: queryGetAllCurrentUserPlaylist,
          variables: { id :"", repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
}
export const queryUpdatePlaylist = gql
`mutation updatePlaylist(
    $playlist_id: String!
    $user_id: String!
    $title: String! 
    $description: String
    $private: Boolean!
    $view: Int!
  ){
  updatePlaylist(
    playlist_id: $playlist_id,
    input:{
      user_id: $user_id,
      title: $title,
      description: $description,
      private: $private,
      view: $view
    }) 
  }`