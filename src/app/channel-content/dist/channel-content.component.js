"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChannelContentComponent = void 0;
var core_1 = require("@angular/core");
var ChannelContentComponent = /** @class */ (function () {
    function ChannelContentComponent(userService, videoDetailService, router, activity) {
        var _this = this;
        this.userService = userService;
        this.videoDetailService = videoDetailService;
        this.router = router;
        this.activity = activity;
        this.videoDetailService.videosValueChange.subscribe(function (value) {
            _this.videoDetailService.setChannelUser(_this.userID);
            _this.channelUser = _this.videoDetailService.getChannelUser();
        });
    }
    ChannelContentComponent.prototype.ngOnInit = function () {
        this.userID = this.activity.snapshot.paramMap.get('id').toString();
        console.log("asdas");
        if (this.videoDetailService.checkIsReady()) {
            this.videoDetailService.setChannelUser(this.userID);
            this.channelUser = this.videoDetailService.getChannelUser();
        }
    };
    ChannelContentComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-content',
            templateUrl: './channel-content.component.html',
            styleUrls: ['./channel-content.component.sass']
        })
    ], ChannelContentComponent);
    return ChannelContentComponent;
}());
exports.ChannelContentComponent = ChannelContentComponent;
