import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  @Output() onIconClick = new EventEmitter<boolean>();

  toogleSideBar(){
    // this.hide = true;
    this.onIconClick.emit(true);
  }

  constructor() { }
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
  }

}
