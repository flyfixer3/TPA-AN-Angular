import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  hide : boolean = true;

  toogleSideBar(){
    if(this.hide){
      this.hide = false
    }else{
      this.hide = true
    }
    
  }

  ngOnInit(): void {
  }

}
