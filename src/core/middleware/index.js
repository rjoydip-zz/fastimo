const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const markoExpress = require('marko/express');

class Middleware {
	constructor() { }

	external(app, config) {
		app.use(morgan('dev'));
		app.use(cors({ exposedHeaders: config.corsHeaders }));
		app.use(bodyParser.json({ limit: config.bodyLimit }));
		app.use(express.static(path.join('..', '..', 'public')));
		app.use(markoExpress()); // enable res.marko(template, data)
	}

	custom(app, config) { 
		// app.use(function(req, res) {
		// 	if(req.path.match(config.apiPrefix)) {
		// 		res.send({
		// 			message: 'API not found'
		// 		});
		// 	} else {
		// 		res.marko(require('../views/error.marko'), {
		// 			message: 'Opps !'
		// 		});
		// 	}
		// });
	}
}

module.exports = Middleware;