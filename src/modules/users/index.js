const App = require('@core/app');

class User extends App {
    constructor() {
        super();
        this.logger.log("user module route setup");
    }

    api() {
        return require('./api');
    }

    routes() {
        return require('./routes');
    }
}

module.exports = new User();