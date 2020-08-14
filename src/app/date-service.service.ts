import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }
  calculateDifference(date:Date){
    let oneDay = 24 * 60 * 60 * 1000;
    let currDate = new Date();
    let videoDate = new Date(date);
    let diffTimes = currDate.getTime() - videoDate.getTime()   
    let diffDays = diffTimes / oneDay;
    console.log(diffDays + "test")
    let partitionDate = this.getPartitionDate(diffDays)
    return (partitionDate.year > 0 ? partitionDate.year + " years ago" :partitionDate.month > 0 ? partitionDate.month + " months ago" : partitionDate.weeks > 0 ? partitionDate.weeks + " weeks ago": diffDays >= 1 ?  partitionDate.days + " days ago" : partitionDate.hours >= 1 ? partitionDate.hours + " hours ago" : partitionDate.minutes >= 1 ? partitionDate.minutes + " minutes ago" : "less than 1 minute")    
  }
  getPartitionDate(days:number) {
    return {
      year : Math.floor(days / 365),
      month : Math.floor(days / 30),
      weeks : Math.floor(days / 7),
      days : Math.floor(days),
      hours : Math.floor(days * 24),
      minutes : Math.floor(days * 24 * 60)
    };
  }
}
