const App = require('@core/app');

class Routes extends App {
    constructor() {
        super();
    }

    init(app) {  
        app.get('/', (req, res) => {
            res.send("Root page")
        });
        app.get('/home', (req, res) => {
            res.send("Home page")
        });
    }
}


module.exports = Routes;