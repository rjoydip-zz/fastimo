const App = require('@core/app');

class Routes extends App {
    constructor() {
        super()
        this.router.get('', (req, res, next) => {
            res.send("Users API");
            next();
        });
        return this.router;
    }
}

module.exports = new Routes();