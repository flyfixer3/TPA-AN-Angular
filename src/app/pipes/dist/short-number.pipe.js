"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShortNumberPipe = void 0;
var core_1 = require("@angular/core");
var ShortNumberPipe = /** @class */ (function () {
    function ShortNumberPipe() {
    }
    ShortNumberPipe.prototype.transform = function (number, args) {
        if (isNaN(number))
            return null; // will only work value is a number
        if (number === null)
            return null;
        if (number === 0)
            return 0;
        var abs = Math.abs(number);
        var rounder = Math.pow(10, 1);
        var isNegative = number < 0; // will also work for Negetive numbers
        var key = '';
        var powers = [
            { key: 'Q', value: Math.pow(10, 15) },
            { key: 'T', value: Math.pow(10, 12) },
            { key: 'B', value: Math.pow(10, 9) },
            { key: 'M', value: Math.pow(10, 6) },
            { key: 'K', value: 1000 }
        ];
        for (var i = 0; i < powers.length; i++) {
            var reduced = abs / powers[i].value;
            reduced = Math.round(reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }
        return (isNegative ? '-' : '') + abs + key;
    };
    ShortNumberPipe = __decorate([
        core_1.Pipe({
            name: 'shortNumber'
        })
    ], ShortNumberPipe);
    return ShortNumberPipe;
}());
exports.ShortNumberPipe = ShortNumberPipe;
