import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsServiceService {
  playlists:{
    id:String
    title:String
    description:String
    view:Number
    private:Boolean
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

  playlistsValueChange: Subject<any[]> = new Subject<any[]>()
  playlistValueChange: Subject<any> = new Subject<any[]>()
  constructor() {
    this.playlistsValueChange.subscribe((value)=>{
      this.playlists = value
    })
    this.playlistValueChange.subscribe((value)=>{
      this.playlist = value
    })
  }
  getPlaylistsByUserId(id:String){
    console.log(this.playlists[0].user.id)
    console.log(id)
    return this.playlists.filter((value)=>value.user.id == id)
  }
  setPlaylists(playlists:any[]){
    this.playlistsValueChange.next(playlists)
  }
  GetVideoAscByPriority(videos:any[]) {
    if(videos.length < 2) return videos
    var videosSort:any[] = videos
    videosSort = [] = videosSort.sort((n1, n2) => {
      if (n1.priority < n2.priority) {
        return 1;
      } else return -1;
    });
    return videosSort
  }
  getPlaylists(){
    return this.playlists
  }
  setPlaylist(id:string){
    console.log(this.playlists)
    this.playlistValueChange.next(this.playlists?.filter((playlist)=> playlist.id == id)[0])
  }
  getPlaylist(){
    return this.playlist
  }
}
