import { Component, OnInit, HostListener } from '@angular/core';
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
  
  constructor(public userService:UserService, private authService: SocialAuthService, private apollo:Apollo) { }
  aUser = {
    name: "asd",
    email: "qwe",
    profile_pict: "asdsa",
    premium: false,
    channel_background: "asd"
  };
  isShow = false;
  isDropdownShow = false;
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn){
        this.newAccountCheck()
      }
    });
  }
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.isShow = false;
  }
  toggleModal($event){
    $event.stopPropagation()
    this.isShow = !this.isShow
  }


  newAccountCheck() {
    console.log("test")
    this.apollo.watchQuery<any>({
      query: findUser,
        variables:{
          email : this.user.email,
        },
    }).valueChanges.subscribe((result)=>{
      var currentUser;
      currentUser = result.data.findUser[0]
      console.log("user - find :")
      console.log(result  )
      if(currentUser == null) {
        this.aUser.name = this.user.name;
        this.aUser.email = this.user.email;
        this.aUser.profile_pict = this.user.photoUrl;
        this.aUser.premium = false ;
        this.aUser.channel_background = "" ;
        this.registerUser()
      }else{
        this.userService.setCurrentUser(currentUser)
      }
    })
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  signOut(): void {
    this.authService.signOut();
  }
 

  registerUser(): void{
    this.apollo.mutate({
      mutation: gql
      `mutation insertUser($newUser: NewUser!){
        createUser(input: $newUser
        ){
          id
          name
          email
          profile_pict
          channel_background
          premium
          save_playlists{
            id
            title
            description
            updated_at
            user{
              id
              profile_pict
              name
            }
            videos{
              id
              title
              thumbnail
              user{
                id
                name
              }
            }
          }
          subscribers{
            id
            target_id
            target{
              id
              name
              email
              profile_pict
              channel_background
              premium
              subscribers{
                id
                target_id
                subscriber_id
                notification
              }
            }
            subscriber_id
            notification
          }
        }
      }`,
        variables:{
          newUser: this.aUser
        },
        refetchQueries:[{
          query: findUser,
          variables: { email : this.user.email, repoFullName: 'apollographql/apollo-client' },
        }]
    }).subscribe();
  }
}

export const findUser = gql
`query findUser($email: String!){
    findUser(email: $email){
      id
      name
      email
      profile_pict
      channel_background
      premium
      save_playlists{
        id
        title
        description
        updated_at
        user{
          id
          profile_pict
          name
        }
        videos{
          id
          title
          thumbnail
          user{
            id
            name
          }
        }
      }
      subscribers{
        id
        target_id
        target{
          id
          name
          email
          profile_pict
          channel_background
          premium
          subscribers{
            id
            target_id
            subscriber_id
            notification
          }
        }
        subscriber_id
        notification
      }
    }
  }`
