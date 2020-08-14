import { Component, OnInit, Query } from '@angular/core';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag'
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.sass']
})
export class HomeContentComponent implements OnInit {

  constructor(private apollo:Apollo) { }
  lastKey;
  observer
  videos;

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: gql
      `query getVideos{
          videos{
            id,
            link,
            title,
            thumbnail,
            description,
            view,
            created_at,
            location{
              id,
              name
            }
            user{
              name,
              profile_pict
            }
          }
        }`
    }).valueChanges.subscribe((result)=>{
      this.videos = result.data.videos
      console.log(this.videos)
      this.lastKey = 12;
      this.observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
          let main = document.querySelector('.video__grid');
          for (let i = 0; i < 4; i++) {
            if (this.lastKey < this.videos.length) {
              let div = document.createElement('div');
              let video = document.createElement('app-video');
              video.setAttribute('video', 'this.videos[this.lastKey]');
              div.appendChild(video);
              main.appendChild(div);
              this.lastKey++;
            }
          }
        }
      });
      this.observer.observe(document.querySelector('.end-point'));  
    })
    
  }

}
