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

  playlistVideo:{
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
  newPrior
  oldPrior
  playlistsValueChange: Subject<any[]> = new Subject<any[]>()
  playlistValueChange: Subject<any> = new Subject<any[]>()
  playlistVideoChange: Subject<any[]> = new Subject<any[]>()
  constructor() {
    this.playlistsValueChange.subscribe((value)=>{
      this.playlists = value
    })
    this.playlistValueChange.subscribe((value)=>{
      this.playlist = value
    })
    this.playlistVideoChange.subscribe((value)=>{
      this.playlistVideo = value
    })
  }
  getPlaylistsByUserId(id:String){
    return this.playlists?.filter((value)=>value.user.id == id)
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
    this.playlistValueChange.next(this.playlists?.filter((playlist)=> playlist.id == id)[0])
  }
  getPlaylist(){
    return this.playlist
  }
  setPlaylistVideo(playlistVideo:any[]){
    this.playlistVideoChange.next(playlistVideo)
  }
  getPlaylistVideo(){
    return this.playlistVideo
  }
}
