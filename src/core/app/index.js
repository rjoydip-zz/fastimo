const express = require('express');

const Config = require('@core/config');
const Logger = require('@core/logger');
const Middleware = require('@core/middleware');

class App {
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.middleware = new Middleware();
        this.config = new Config();
        this.logger = new Logger();
    }
}

module.exports = App;