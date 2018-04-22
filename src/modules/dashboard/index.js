const path = require('path');

const App = require('@core/app');

class User extends App {
    constructor() {
        super();
    }

    api() {
        return require('./api');
    }

    routes() {
        return require('./routes');
    }
}

module.exports = new User();