"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var home_content_component_1 = require("./home-content/home-content.component");
var video_component_1 = require("./video/video.component");
var graphql_module_1 = require("./graphql.module");
var http_1 = require("@angular/common/http");
var ng_inline_svg_1 = require("ng-inline-svg");
var search_box_component_1 = require("./search-box/search-box.component");
var user_features_bar_component_1 = require("./user-features-bar/user-features-bar.component");
var angularx_social_login_1 = require("angularx-social-login");
var angularx_social_login_2 = require("angularx-social-login");
var side_bar_component_1 = require("./side-bar/side-bar.component");
var side_bar_item_component_1 = require("./side-bar-item/side-bar-item.component");
var app_routing_module_1 = require("./app-routing/app-routing.module");
var watch_content_component_1 = require("./watch-content/watch-content.component");
var comment_component_1 = require("./comment/comment.component");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
var config = {
    apiKey: "AIzaSyBQ3PrCI2qz5L4WNW73TlabzTbrSDpLdRE",
    authDomain: "tpa-web-284810.firebaseapp.com",
    databaseURL: "https://tpa-web-284810.firebaseio.com",
    projectId: "tpa-web-284810",
    storageBucket: "tpa-web-284810.appspot.com",
    messagingSenderId: "991337320632"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_content_component_1.HomeContentComponent,
                video_component_1.VideoComponent,
                search_box_component_1.SearchBoxComponent,
                user_features_bar_component_1.UserFeaturesBarComponent,
                side_bar_component_1.SideBarComponent,
                side_bar_item_component_1.SideBarItemComponent,
                watch_content_component_1.WatchContentComponent,
                comment_component_1.CommentComponent,
            ],
            imports: [
                angularx_social_login_1.SocialLoginModule,
                forms_1.FormsModule,
                platform_browser_1.BrowserModule,
                graphql_module_1.GraphQLModule,
                http_1.HttpClientModule,
                ng_inline_svg_1.InlineSVGModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                fire_1.AngularFireModule.initializeApp(config),
                firestore_1.AngularFirestoreModule,
                storage_1.AngularFireStorageModule
            ],
            providers: [
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: angularx_social_login_2.GoogleLoginProvider.PROVIDER_ID,
                                provider: new angularx_social_login_2.GoogleLoginProvider('724389331143-63cegco71a333kgnjemikghq5me74e84.apps.googleusercontent.com')
                            }
                        ]
                    }
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
