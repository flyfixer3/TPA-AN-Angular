import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.sass']
})
export class SideBarItemComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }
  @Input() item:{
    svg_path:string
    title:string
  };
}
