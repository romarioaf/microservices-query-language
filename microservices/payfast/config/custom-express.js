const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const extractor = require('../../../extractor/extractor');

module.exports = function() {
	var app = express();
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());
	app.use(extractor());

	consign()
		.include('controllers')
		.then('repository')
		.then('services')
		.into(app);

	return app;
};
