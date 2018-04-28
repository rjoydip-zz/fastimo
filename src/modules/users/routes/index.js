const App = require('@core/app');

class Routes extends App {
    constructor() {
        super()
        this.router.get('', (req, res, next) => { 
            res.marko(require('../views/users.marko'), {
                title: 'Users'
            });
            next();
        });
        return this.router;
    }
}

module.exports = new Routes();