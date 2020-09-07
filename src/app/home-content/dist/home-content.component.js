"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeContentComponent = void 0;
var core_1 = require("@angular/core");
var HomeContentComponent = /** @class */ (function () {
    function HomeContentComponent(apollo, videoService) {
        var _this = this;
        this.apollo = apollo;
        this.videoService = videoService;
        videoService.videosValueChange.subscribe(function (value) {
            _this.videos = _this.videoService.getVideos();
        });
    }
    HomeContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lastKey = 12;
        this.observer = new IntersectionObserver(function (entry) {
            var _a;
            if (entry[0].isIntersecting) {
                if (_this.videoService.checkIsReady()) {
                    var main = document.querySelector('.video__grid');
                    for (var i = 0; i < 4; i++) {
                        if (_this.lastKey < ((_a = _this.videos) === null || _a === void 0 ? void 0 : _a.length)) {
                            var div = document.createElement('div');
                            var video = document.createElement('app-video');
                            video.setAttribute('video', 'this.videos[this.lastKey]');
                            div.appendChild(video);
                            main.appendChild(div);
                            _this.lastKey++;
                        }
                    }
                }
            }
        });
        this.observer.observe(document.querySelector('.end-point'));
    };
    HomeContentComponent = __decorate([
        core_1.Component({
            selector: 'app-home-content',
            templateUrl: './home-content.component.html',
            styleUrls: ['./home-content.component.sass']
        })
    ], HomeContentComponent);
    return HomeContentComponent;
}());
exports.HomeContentComponent = HomeContentComponent;
