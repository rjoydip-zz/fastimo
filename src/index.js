const express = require('express');

const DB = require('./db');
const middleware = require('./middleware');
const config = require('./config');

class Server {
    constructor(host, port, opt) {
        this.host = host || config.host;
        this.port = port || config.port;
        this.opt = opt || config;
        this.app = express();
    }

    async setup() {
        // 3rd party middleware
        this.app.use(() => middleware.external);
        console.log("External miuddleware setup done");
        return await true;
    }

    async listen() {
        return await new Promise((resolve, reject) => {
            this.app.listen(this.port, this.host, (err) => {
                err ? reject(err) : (this.setup(), resolve({ host: this.host, port: this.port }));
            });
        });
    }
}

module.exports = Server;