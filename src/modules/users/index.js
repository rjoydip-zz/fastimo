const express = require('express');

class User {
    constructor() {
        this.app = express();
        this.setup();
    }

    setup() {
        console.log("user route setup");
        this.app.get('/users', (req, res) => {
            res.send("Users");
        });
    }
}

module.exports = new User();