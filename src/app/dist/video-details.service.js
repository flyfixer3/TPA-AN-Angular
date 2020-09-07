"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VideoDetailsService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var VideoDetailsService = /** @class */ (function () {
    function VideoDetailsService() {
        var _this = this;
        this.channelUserValueChange = new rxjs_1.Subject();
        this.videosValueChange = new rxjs_1.Subject();
        this.videosValueChange.subscribe(function (value) {
            _this.videos = value;
        });
        this.channelUserValueChange.subscribe(function (value) {
            _this.channelUser = value;
        });
    }
    VideoDetailsService.prototype.setVideos = function (videos) {
        this.videosValueChange.next(videos);
    };
    VideoDetailsService.prototype.shuffle = function (a) {
        var _a;
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
        }
        return a;
    };
    VideoDetailsService.prototype.getVideos = function () {
        if (this.checkIsReady())
            return this.shuffle(this.videos);
    };
    VideoDetailsService.prototype.getVideo = function (id) {
        var _this = this;
        this.videos.forEach(function (element) {
            if (element.id == id) {
                _this.video = element;
            }
        });
        return this.video;
    };
    VideoDetailsService.prototype.getChannelVideoAscByDate = function (userID, index) {
        if (index === void 0) { index = -1; }
        var channelVideos = this.videos.filter(function (video) { return video.user.id == userID; });
        console.log(channelVideos);
        channelVideos = channelVideos.sort(function (n1, n2) {
            var a = new Date(n1.created_at);
            var b = new Date(n2.created_at);
            if (a.getTime() < b.getTime()) {
                return 1;
            }
            else
                return -1;
        });
        if (index == -1)
            return channelVideos;
        else {
            return channelVideos[index];
        }
    };
    VideoDetailsService.prototype.setChannelUser = function (userID) {
        this.channelUserValueChange.next(this.videos.filter(function (video) { return video.user.id == userID; })[0].user);
    };
    VideoDetailsService.prototype.getChannelUser = function () {
        return this.channelUser;
    };
    VideoDetailsService.prototype.checkIsReady = function () {
        if (this.videos)
            return true;
        return false;
    };
    VideoDetailsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], VideoDetailsService);
    return VideoDetailsService;
}());
exports.VideoDetailsService = VideoDetailsService;
