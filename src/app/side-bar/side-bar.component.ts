import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { PlaylistsServiceService } from '../playlists-service.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  @Output() onIconClick = new EventEmitter<boolean>();
  playlists:any[]
  savePlaylists:any[]
  toogleSideBar(){
    this.onIconClick.emit(true);
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
      target:any
      subscriber_id:String
      notification:Boolean
    }[]
  }
  constructor(private userService:UserService,private apollo:Apollo, private playlistService:PlaylistsServiceService, private router:Router) {
    userService.currentUserValueChange.subscribe((user)=>{
      this.currentUser = user
      console.log(this.currentUser)
      this.playlists = this.playlistService.getPlaylistsByUserId(this.currentUser.id.toString())
    })
    this.playlistService.playlistsValueChange.subscribe(()=>{
      if(this.currentUser){
        this.playlists = this.playlistService.getPlaylistsByUserId(this.currentUser.id.toString())
      }
    })
   }
   getAllCurrentUserPlaylists(userID:String){
    this.apollo.watchQuery<any>({
      query: queryGetAllCurrentUserPlaylist,
      variables:{
        id:userID
      }
    }).valueChanges.subscribe((result)=>{
      this.playlistService.setPlaylists(result.data.findPlaylistByUserId)
      this.savePlaylists = this.userService.getCurrentUser()?.save_playlists
    })
   }
  items_main = [
    {
      svg_path:'assets/home.svg',
      title:"Home"
    },
    {
      svg_path:'assets/trending.svg',
      title:"Trending"
    },
    {
      svg_path:'assets/subscription.svg',
      title:"Subscription"
    },
    {
      svg_path:'assets/membership.svg',
      title:"Membership"
    }
  ]

  items_categories = [
    {
      svg_path:'assets/music.svg',
      title:"Music"
    },
    {
      svg_path:'assets/sport.svg',
      title:"Sport"
    },
    {
      svg_path:'assets/game.svg',
      title:"Gaming"
    },
    {
      svg_path:'assets/entertainment.svg',
      title:"Entertainment"
    },
    {
      svg_path:'assets/news.svg',
      title:"News"
    },
    {
      svg_path:'assets/travel.svg',
      title:"Travel"
    }
    
  ]
  ngOnInit(): void {
    this.getAllCurrentUserPlaylists("")
    this.currentUser = this.userService.getCurrentUser()
  }
  setChannelUser(user:any){
    this.userService.setChannelUser(user)
  }
  goToPage(x:any){
    this.router.navigateByUrl("/"+ x.title.toLowerCase())
  }
}

export const queryGetAllCurrentUserPlaylist = gql
`query getPlaylistByUserId($id: String!){
    findPlaylistByUserId(id:$id){
      id
      title
      description
      private
      view
      updated_at
      user{
        id
        profile_pict
        name
      }
      videos{
        id
        title
        thumbnail
        user{
          id
          name
        }
      }
    }
  }`