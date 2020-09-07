import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag'
import { VideoDetailsService } from '../video-details.service'
import { queryGetVideos } from '../watch-content/watch-content.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private apollo:Apollo, private VideoService:VideoDetailsService) { 
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }

  hide : boolean = false;

  toogleSideBar(){
    if(this.hide){
      this.hide = false
    }else{
      this.hide = true
    }
    
  }

  ngOnInit(): void {
    this.getAllVideos()
  }
  getAllVideos(){
    this.apollo.watchQuery<any>({
      query: queryGetVideos
    }).valueChanges.subscribe((result)=>{
      console.log("first data : ")
      console.log(result.data)
      this.VideoService.setVideos(result.data.videos)
    })
  }
  

}
