import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DateServiceService } from '../date-service.service';
import { findUserById } from '../channel-content/channel-content.component';
import gql from 'graphql-tag';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-channel-community-page',
  templateUrl: './channel-community-page.component.html',
  styleUrls: ['./channel-community-page.component.sass']
})
export class ChannelCommunityPageComponent implements OnInit {

  constructor(public userService:UserService, private router:Router ,private activity:ActivatedRoute, private apollo:Apollo,private dateService:DateServiceService, private fireStorage:AngularFireStorage) {

  }
  user:{
    id:String
    name:String
    email: String
    profile_pict: String
    premium: Boolean
    channel_background: String
  }
  taskPost: AngularFireUploadTask;
  percentagePost: Observable<number>;
  snapshotPost: Observable<any>;
  downloadUrlPost: string = '';
  post:{
    id:String
    title:String
    description:String
    media:String    
    user:{
      id:String
      name:String
      email: String
      profile_pict: String
      premium: Boolean
      channel_background: String
    }
    like_post:{
      user_id:String
      post_id:String
      status:Boolean
    }[]
    created_at:Date
  }[]
  inputTitle;
  inputDescription;
  linkMedia;
  postMedia="";
  userID

  ngOnInit(): void {
    this.user = this.userService.getChannelUser()
    this.findPostChannelUser(this.user.id)    
  }

  async startUploadImage(event: FileList) {
    const fileP = event.item(0);

    if (fileP.type.split('/')[0] !== 'image') {
      alert('Insert type image please!');
      return;
    }

    const pathP = `post/${fileP.name}`;

    const customMetadata = { app: 'TPA-Web' };

    this.taskPost = this.fireStorage.upload(pathP, fileP, { customMetadata });

    this.percentagePost = this.taskPost.percentageChanges();

    this.snapshotPost = this.taskPost.snapshotChanges();

    (await this.taskPost).ref.getDownloadURL().then((url) => {
      this.postMedia = url;
    });
  }


  findPostChannelUser(userID) {
    this.apollo.watchQuery<any>({
      query: findPostbyUserId,
        variables:{
          user_id : userID,
        },
    }).valueChanges.subscribe((result)=>{
        this.post = result.data.findPostByUserId
    })
  }
  insertPost(): void{
    console.log(this.userService.getChannelUser().id)
    this.apollo.mutate({
      mutation: gql
      `mutation insertPost(
          $user_id: String! 
          $title: String!
          $description: String! 
          $media: String! 
       ){
        createPost(
          input:{
            user_id: $user_id,
            title: $title,
            description: $description,
            media: $media
        }){
          id
        }
      }`,
        variables:{
          user_id: this.userService.getChannelUser().id,
          title: this.inputTitle,
          description: this.inputDescription,
          media: this.postMedia
        },
        refetchQueries:[{
          query: findPostbyUserId,
          variables: { user_id : this.userService.getChannelUser().id, repoFullName: 'apollographql/apollo-client' },
        }]
      }).subscribe();
  }
}

export const findPostbyUserId =  gql
`query findPostByUserId($user_id: String!){
    findPostByUserId(user_id: $user_id){
      id
      title
      description
      media
      user{
        id
        name
        email
        profile_pict
        channel_background
        premium
      }
      like_post{
        user_id
        post_id
        status
      }
      created_at
    }
  }`


