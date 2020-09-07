import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import {Router} from '@angular/Router'

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.sass']
})
export class SideBarItemComponent implements OnInit {

  constructor(public router:Router) { }
  
  ngOnInit(): void {
  }
  @Input() item:{
    svg_path:string
    title:string
  };
  routing(){
    this.router.navigateByUrl(this.item.title.toLowerCase())
  }
  
 



}
