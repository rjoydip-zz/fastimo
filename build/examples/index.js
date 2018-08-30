"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var app = src_1.App(3001);
app.then(function () {
    console.log('server is listining 3001');
});
