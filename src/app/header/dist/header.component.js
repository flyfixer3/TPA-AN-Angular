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
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(apollo, VideoService) {
        this.apollo = apollo;
        this.VideoService = VideoService;
        this.hide = true;
    }
    HeaderComponent.prototype.toogleSideBar = function () {
        if (this.hide) {
            this.hide = false;
        }
        else {
            this.hide = true;
        }
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["query getVideos{\n          videos{\n            id,\n            link,\n            title,\n            thumbnail,\n            description,\n            view,\n            created_at,\n            location{\n              id,\n              name\n            }\n            user{\n              id,\n              name,\n              email,\n              profile_pict,\n              premium,\n              channel_background\n            }\n            like_video{\n              user_id\n              video_id\n              status\n            }\n          }\n        }"], ["query getVideos{\n          videos{\n            id,\n            link,\n            title,\n            thumbnail,\n            description,\n            view,\n            created_at,\n            location{\n              id,\n              name\n            }\n            user{\n              id,\n              name,\n              email,\n              profile_pict,\n              premium,\n              channel_background\n            }\n            like_video{\n              user_id\n              video_id\n              status\n            }\n          }\n        }"])))
        }).valueChanges.subscribe(function (result) {
            _this.VideoService.setVideos(result.data.videos);
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.sass']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
var templateObject_1;
