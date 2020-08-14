import { Component, OnInit, Input} from '@angular/core';
import {DateServiceService} from '../date-service.service'


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit {

  constructor(private dateService:DateServiceService) { }
  diffDate;
  @Input() comment:{
    id:String
    parent_id:String
    comment:String
    user:{
      id:String
      name:String
      profile_pict:String
    }
    created_at:Date
  };
  ngOnInit(): void {
    this.diffDate = this.dateService.calculateDifference(this.comment.created_at)
  }
  
}
