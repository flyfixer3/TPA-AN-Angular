import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-playlist',
  templateUrl: './side-bar-playlist.component.html',
  styleUrls: ['./side-bar-playlist.component.sass']
})
export class SideBarPlaylistComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  @Input() playlist:{
    id:string
    title:string
  };
  current = false;

}
