import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContentComponent } from '../home-content/home-content.component';
import { WatchContentComponent } from '../watch-content/watch-content.component'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeContentComponent },
  { path: 'watch/:title', component: WatchContentComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
