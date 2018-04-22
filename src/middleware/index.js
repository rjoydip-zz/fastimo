const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

class Middleware {
	constructor() {
		this.app = express();
		this.config = require('../config');
	}

	external() {
		this.app.use(morgan('dev'));
		this.app.use(cors({ exposedHeaders: this.config.corsHeaders }));
		this.app.use(bodyParser.json({ limit : this.config.bodyLimit }))
	}

	custom() {
		
	}
}

module.exports = new Middleware();