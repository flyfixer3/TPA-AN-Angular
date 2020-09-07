"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserFeaturesBarComponent = void 0;
var core_1 = require("@angular/core");
var angularx_social_login_1 = require("angularx-social-login");
var graphql_tag_1 = require("graphql-tag");
var UserFeaturesBarComponent = /** @class */ (function () {
    function UserFeaturesBarComponent(userService, authService, apollo) {
        this.userService = userService;
        this.authService = authService;
        this.apollo = apollo;
        this.aUser = {
            name: "asd",
            email: "qwe",
            profile_pict: "asdsa",
            premium: false,
            channel_background: "asd"
        };
    }
    UserFeaturesBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = (user != null);
            if (_this.loggedIn) {
                _this.newAccountCheck();
            }
        });
    };
    UserFeaturesBarComponent.prototype.newAccountCheck = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["query findUser($email: String!){\n          findUser(email: $email){\n            id\n            name\n            email\n            profile_pict\n            channel_background\n            premium\n          }\n        }"], ["query findUser($email: String!){\n          findUser(email: $email){\n            id\n            name\n            email\n            profile_pict\n            channel_background\n            premium\n          }\n        }"]))),
            variables: {
                email: this.user.email
            }
        }).valueChanges.subscribe(function (result) {
            var currentUser;
            currentUser = result.data.findUser;
            if (currentUser == null) {
                _this.aUser.name = _this.user.name;
                _this.aUser.email = _this.user.email;
                _this.aUser.profile_pict = _this.user.photoUrl;
                _this.aUser.premium = false;
                _this.aUser.channel_background = "";
                _this.registerUser();
            }
            else {
                _this.userService.setCurrentUser(currentUser);
            }
        });
    };
    UserFeaturesBarComponent.prototype.signInWithGoogle = function () {
        this.authService.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
    };
    UserFeaturesBarComponent.prototype.signOut = function () {
        this.authService.signOut();
    };
    UserFeaturesBarComponent.prototype.registerUser = function () {
        var _this = this;
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["mutation insertUser($newUser: NewUser!){\n        createUser(input: $newUser\n        ){\n          id\n          name\n          email\n          profile_pict\n          channel_background\n          premium\n        }\n      }"], ["mutation insertUser($newUser: NewUser!){\n        createUser(input: $newUser\n        ){\n          id\n          name\n          email\n          profile_pict\n          channel_background\n          premium\n        }\n      }"]))),
            variables: {
                newUser: this.aUser
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log(data);
            var currentUser;
            currentUser = data;
            _this.userService.setCurrentUser(currentUser.createUser);
        });
    };
    UserFeaturesBarComponent = __decorate([
        core_1.Component({
            selector: 'app-user-features-bar',
            templateUrl: './user-features-bar.component.html',
            styleUrls: ['./user-features-bar.component.sass']
        })
    ], UserFeaturesBarComponent);
    return UserFeaturesBarComponent;
}());
exports.UserFeaturesBarComponent = UserFeaturesBarComponent;
var templateObject_1, templateObject_2;
