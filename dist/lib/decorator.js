"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, ["Console"].concat(args));
    return function (target, propertyName, descriptor) {
        console.log("Method info decorator log >>>>>>  ", target, " >>> ", propertyName, " >>> ", descriptor);
    };
};
