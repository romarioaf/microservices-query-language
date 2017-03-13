var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var extractor = require('../../../extractor/extractor');

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
