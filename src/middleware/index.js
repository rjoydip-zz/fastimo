const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config');

exports.external = Object.assign({}, morgan('dev'), cors({
	exposedHeaders: config.corsHeaders
}), bodyParser.json({
	limit : config.bodyLimit
}));

exports.default = () => {
	return;
}

module.exports = exports;