import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoDetailsService {
  
  
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
      name:String
      profile_pict:String
    }
  };
  constructor() { }

  setVideo(video:any){
    this.video = video
    console.log(this.video)
  }
  getVideo(){
    return this.video
  }
}
