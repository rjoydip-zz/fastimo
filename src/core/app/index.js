const Config = require('@core/config');
const Logger = require('@core/logger');
const Middleware = require('@core/middleware');

class App {
    constructor() {
        this.app = require('express')();
        this.middleware = new Middleware();
        this.config = new Config();
        this.logger = new Logger();
    }
}

module.exports = App;