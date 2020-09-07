import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:{
    id:String
    name:String
    profile_pict:String
    email:String
    channel_background:String
    premium:boolean
    save_playlists:{
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
        thumbnail
        user:{
          id:String
          name:String
        }
      }[]
    }[]
    subscribers:{
      id:String
      target_id:String
      target:any
      subscriber_id:String
      notification:Boolean
    }[]
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
  channelUserValueChange: Subject<any> = new Subject<any>()
  currentUserValueChange: Subject<any> = new Subject<any>()
  constructor() { 
    this.currentUserValueChange.subscribe((value)=>{
      this.user = value
    })
    this.channelUserValueChange.subscribe((value)=>{
      this.channelUser = value
    })
  }
  
  setChannelUser(user:any){
    this.channelUserValueChange.next(user)
  }
  getChannelUser(){
    return this.channelUser
  }
  setCurrentUser(user:any){
    this.currentUserValueChange.next(user)
  }
  getCurrentUser(){
    return this.user
  }
 
}
