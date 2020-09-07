import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
      id:String
      name:String
      email: String
      profile_pict: String
      premium: Boolean
      channel_background: String
      subscribers:{
        id:String
        target_id:String
        target:any
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
  videos:{
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
      email: String
      profile_pict: String
      premium: Boolean
      channel_background: String
      subscribers:{
        id:String
        target_id:String
        target:any
        subscriber_id:String
        notification:Boolean
      }[]
    }
    like_video:{
      user_id:String
      video_id:String
      status:Boolean
    }[]
  }[];

  videosValueChange: Subject<any[]> = new Subject<any[]>()
  constructor() { 
    this.videosValueChange.subscribe((value)=>{
      this.videos = value
    })
  }

  setVideos(videos:any[]){
   this.videosValueChange.next(videos)
  }
  shuffle(a: any) {
    for (var i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getVideos(){
    if(this.checkIsReady()) return this.videos
  }
  getVideo(id:String):any{
    this.videos.forEach(element => {
      if(element.id == id){
        this.video = element
      }
    });
    return this.video
  }
  
  sortVideoAscByDate(videos:any[]) {
    var channelVideos = videos
    console.log(channelVideos)
    channelVideos = [] = channelVideos.sort((n1, n2) => {
      var a = new Date(n1.created_at);
      var b = new Date(n2.created_at);
      if (a.getTime() < b.getTime()) {
        return 1;
      } else return -1;
    });
    return channelVideos
  }
  getAllVideoByChannelId(id:String){
    return this.videos.filter((video)=> video.user.id == id)
  }
  checkIsReady():Boolean{
    if(this.videos) return true
    return false
  }

}
