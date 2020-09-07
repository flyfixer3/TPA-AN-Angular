"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChannelHomePageComponent = void 0;
var core_1 = require("@angular/core");
var ChannelHomePageComponent = /** @class */ (function () {
    function ChannelHomePageComponent(userService, videoDetailService, dateService) {
        this.userService = userService;
        this.videoDetailService = videoDetailService;
        this.dateService = dateService;
        this.arr = Array;
        this.num = 5;
    }
    ChannelHomePageComponent.prototype.ngOnInit = function () {
        this.user = this.videoDetailService.getChannelUser();
        this.recentUploadVideo = this.videoDetailService.getChannelVideoAscByDate(this.user.id, 0);
        this.diffDate = this.dateService.calculateDifference(this.recentUploadVideo.created_at);
        this.fiveVideos = this.videoDetailService.getVideos().slice(0, 5);
    };
    ChannelHomePageComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-home-page',
            templateUrl: './channel-home-page.component.html',
            styleUrls: ['./channel-home-page.component.sass']
        })
    ], ChannelHomePageComponent);
    return ChannelHomePageComponent;
}());
exports.ChannelHomePageComponent = ChannelHomePageComponent;
