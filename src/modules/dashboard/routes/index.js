const App = require('@core/app');

class Routes extends App {
    constructor() {
        super()
        this.router.get('', (req, res, next) => {
            // console.log("views", this.app.get('views'));          
            res.render("users", {
                user: 'World'
            });
            next();
        });
        return this.router;
    }
}

module.exports = new Routes();