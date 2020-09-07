"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SideBarComponent = void 0;
var core_1 = require("@angular/core");
var SideBarComponent = /** @class */ (function () {
    function SideBarComponent() {
        this.onIconClick = new core_1.EventEmitter();
        this.items_main = [
            {
                svg_path: 'assets/home.svg',
                title: "Home"
            },
            {
                svg_path: 'assets/trending.svg',
                title: "Trending"
            },
            {
                svg_path: 'assets/subscription.svg',
                title: "Subscription"
            },
            {
                svg_path: 'assets/membership.svg',
                title: "Membership"
            }
        ];
        this.items_categories = [
            {
                svg_path: 'assets/music.svg',
                title: "Music"
            },
            {
                svg_path: 'assets/sport.svg',
                title: "Sport"
            },
            {
                svg_path: 'assets/game.svg',
                title: "Gaming"
            },
            {
                svg_path: 'assets/entertainment.svg',
                title: "Entertainment"
            },
            {
                svg_path: 'assets/news.svg',
                title: "News"
            },
            {
                svg_path: 'assets/travel.svg',
                title: "Travel"
            }
        ];
    }
    SideBarComponent.prototype.toogleSideBar = function () {
        // this.hide = true;
        this.onIconClick.emit(true);
    };
    SideBarComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Output()
    ], SideBarComponent.prototype, "onIconClick");
    SideBarComponent = __decorate([
        core_1.Component({
            selector: 'app-side-bar',
            templateUrl: './side-bar.component.html',
            styleUrls: ['./side-bar.component.sass']
        })
    ], SideBarComponent);
    return SideBarComponent;
}());
exports.SideBarComponent = SideBarComponent;
