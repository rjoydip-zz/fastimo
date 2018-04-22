const fs = require('fs');
const path = require('path');
const express = require('express');

// const DB = require('./db');
const middleware = require('./middleware');
const config = require('./config');

class Server {
    constructor(host, port, opt) {
        this.host = host || config.host;
        this.port = port || config.port;
        this.opt = opt || config;
        this.app = express();
        this.router = express.Router();
    }

    moduleLoad(moduleName) {
        return fs.readdirSync(path.join(__dirname, moduleName)).forEach(_module => {
            _module.length ? require(path.join(__dirname, moduleName, _module)) : false;
            console.log("Modules loaded successfully");
        });
    }

    middlewareSetup() {
        // 3rd party middleware
        middleware.external();
        middleware.custom();
        console.log("External middleware setup done");
    }

    routerSetup() {
        this.app.get('/', (req, res) => {
            res.send("Home page")
        });
    }

    listen(cb) {
        this.middlewareSetup();
        this.moduleLoad('modules');
        this.routerSetup();
        return this.app.listen(this.port, this.host, cb({ port: this.port, host: this.host }));
    }
}

module.exports = Server;