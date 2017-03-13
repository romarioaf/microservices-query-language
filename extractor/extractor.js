var http		 = require("http");
var mongoose = require("./config/database.js")();
var Info 		 = require("./models/info.js")();

function extractorMiddleware (req, res, next) {

	console.log("---------------------------------------------------");
	console.log('HEADERS: ' + JSON.stringify(req.headers));
	console.log("---------------------------------------------------");

	var timerInicial = new Date().getTime();
	console.log(timerInicial);
	res.on('finish', function() {

	    console.log("HeadersSent " + res.headersSent);
	    console.log("statusCode " + res.statusCode);
	    console.log(res._headers);
	    console.log("Content-Type", res._headers['content-type']);

  	});
  	var timerFinal = new Date().getTime();
		console.log(timerFinal);

		console.log(timerFinal - timerInicial);

  	console.log("---------------------------------------------------");

		res.on('error', function(error) {
	    //console.log("error " + error);
  	});

		var info = new Info(
			{ "service" : {"name": "Payfast", "status": "up"},
				"request" : {"time": 12, "method": req.method, "url": req.url},
				"response": {"statusCode": res.statusCode, "contentType": res._headers['content-type'], "error": ""}
			});

		info.save(function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Salvo com sucesso');
			}
		});

  	next();
};

module.exports = function () {
	return extractorMiddleware;
};
