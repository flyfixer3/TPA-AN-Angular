import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  user:{
    id:String
    name:String
    profile_pict:String
    email:String
    channel_background:String
    premium:boolean
  }
  setCurrentUser(user:any){
    this.user = user
  }
  getCurrentUser(){
    return this.user
  }
}
