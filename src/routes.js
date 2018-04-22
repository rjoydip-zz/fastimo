const App = require('@core/app');

class Routes extends App {
    constructor() {
        super();
    }

    init(app) {
        app.use('/users', require('./modules/users').routes());
        app.use('/api/users', require('./modules/users').api());
    }
}

module.exports = new Routes();