// const path = require('path');

class MarkoRender {
	constructor() {
		return (req, res, next) => {
			Object.assign(res, {
				markoRender: this.markoRender
			});
			next();
		}
	}

	markoRender(file, data) {
		
	}
}	

module.exports = MarkoRender;