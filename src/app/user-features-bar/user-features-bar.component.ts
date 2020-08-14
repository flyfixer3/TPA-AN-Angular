import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { UserService } from "../user.service";
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-user-features-bar',
  templateUrl: './user-features-bar.component.html',
  styleUrls: ['./user-features-bar.component.sass']
})
export class UserFeaturesBarComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  currentUser;
  constructor(private userService:UserService, private authService: SocialAuthService, private apollo:Apollo) { }
  aUser = {
    name: "asd",
    email: "qwe",
    profile_pict: "asdsa",
    premium: false,
    channel_background: "asd"
  };

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn){
        this.userService.setCurrentUser(this.user)
        this.newAccountCheck()
      }
    });
  }


  newAccountCheck() {
    this.apollo.watchQuery<any>({
      query: gql
      `query findUser($email: String!){
          findUser(email: $email){
            id
            name
            email
            profile_pict
            channel_background
            premium
          }
        }`,
        variables:{
          email : this.user.email,
        },
    }).valueChanges.subscribe((result)=>{
      this.currentUser = result.data.findUser
      if(this.currentUser == null) {
        this.aUser.name = this.user.name;
        this.aUser.email = this.user.email;
        this.aUser.profile_pict = this.user.photoUrl;
        this.aUser.premium = false ;
        this.aUser.channel_background = "" ;
        this.registerUser()
      }
    })
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

 

  registerUser(): void{
    this.apollo.mutate({
      mutation: gql
      `mutation insertUser($newUser: NewUser!){
        createUser(input: $newUser
        ){
          id
        }
      }`,
        variables:{
          newUser: this.aUser
        }
    }).subscribe((result) => {
      // console.log('insert data', data);
    });
  }


 
  signOut(): void {
    this.authService.signOut();
  }

}
