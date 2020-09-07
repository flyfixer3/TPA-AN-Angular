"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChannelVideosPageComponent = void 0;
var core_1 = require("@angular/core");
var ChannelVideosPageComponent = /** @class */ (function () {
    function ChannelVideosPageComponent(videoService, activity) {
        this.videoService = videoService;
        this.activity = activity;
        this.currentFeature = 0;
    }
    ChannelVideosPageComponent.prototype.onDocumentClick = function (event) {
        this.isShow = false;
    };
    ChannelVideosPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.videoService.getChannelUser();
        console.log(this.user.id);
        this.videos = this.videoService.getChannelVideoAscByDate(this.user.id);
        this.lastKey = 12;
        this.observer = new IntersectionObserver(function (entry) {
            if (entry[0].isIntersecting) {
                var main = document.querySelector('.video__grid');
                for (var i = 0; i < 4; i++) {
                    if (_this.lastKey < _this.videos.length) {
                        var div = document.createElement('div');
                        var video = document.createElement('app-video');
                        video.setAttribute('video', 'this.videos[this.lastKey]');
                        div.appendChild(video);
                        main.appendChild(div);
                        _this.lastKey++;
                    }
                }
            }
        });
        this.observer.observe(document.querySelector('.end-point'));
    };
    ChannelVideosPageComponent.prototype.allVideo = function () {
        this.videos = this.videoService.getVideos();
    };
    ChannelVideosPageComponent.prototype.toggleShowHideModal = function ($event) {
        $event.stopPropagation();
        this.isShow = !this.isShow;
    };
    ChannelVideosPageComponent.prototype.sortNewest = function () {
        this.videos = this.videos.sort(function (n1, n2) {
            var a = new Date(n1.created_at);
            var b = new Date(n2.created_at);
            if (a.getTime() < b.getTime()) {
                return 1;
            }
            else
                return -1;
        });
        this.currentFeature = 0;
    };
    ChannelVideosPageComponent.prototype.sortOldest = function () {
        this.videos = this.videos.sort(function (n1, n2) {
            var a = new Date(n1.created_at);
            var b = new Date(n2.created_at);
            if (a.getTime() > b.getTime()) {
                return 1;
            }
            else
                return -1;
        });
        this.currentFeature = 1;
    };
    ChannelVideosPageComponent.prototype.sortMostPopular = function () {
        this.videos = this.videos.sort(function (n1, n2) {
            var a = n1.view;
            var b = n2.view;
            if (a < b) {
                return 1;
            }
            else
                return -1;
        });
        this.currentFeature = 2;
    };
    __decorate([
        core_1.HostListener('document:click', ['$event'])
    ], ChannelVideosPageComponent.prototype, "onDocumentClick");
    ChannelVideosPageComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-videos-page',
            templateUrl: './channel-videos-page.component.html',
            styleUrls: ['./channel-videos-page.component.sass']
        })
    ], ChannelVideosPageComponent);
    return ChannelVideosPageComponent;
}());
exports.ChannelVideosPageComponent = ChannelVideosPageComponent;
