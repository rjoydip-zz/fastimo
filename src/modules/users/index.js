const App = require('@core/app');

class User extends App {
    constructor() {
        super();
        this.logger.log("user route setup");
        this.app.get('/users', (req, res) => {
            res.send("Users");
        });
    }
}

module.exports = new User();