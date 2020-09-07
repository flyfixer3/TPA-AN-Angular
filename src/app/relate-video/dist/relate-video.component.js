"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RelateVideoComponent = void 0;
var core_1 = require("@angular/core");
var RelateVideoComponent = /** @class */ (function () {
    function RelateVideoComponent(videoDetailService, dateService) {
        this.videoDetailService = videoDetailService;
        this.dateService = dateService;
    }
    RelateVideoComponent.prototype.ngOnInit = function () {
        this.diffDate = this.dateService.calculateDifference(this.video.created_at);
    };
    __decorate([
        core_1.Input()
    ], RelateVideoComponent.prototype, "video");
    RelateVideoComponent = __decorate([
        core_1.Component({
            selector: 'app-relate-video',
            templateUrl: './relate-video.component.html',
            styleUrls: ['./relate-video.component.sass']
        })
    ], RelateVideoComponent);
    return RelateVideoComponent;
}());
exports.RelateVideoComponent = RelateVideoComponent;
