var http		 = require("http");
var mongoose = require("./config/database.js")();
var Info 		 = require("./models/info.js")();

function extractor (req, res, next) {

	var timerInicial = new Date().getTime();
	var timerFinal = null;
	var requestTime = null;

	res.on('finish', function() {
		timerFinal = new Date().getTime();
		requestTime = timerFinal - timerInicial;

		var info = new Info (
			{ "service" : {"name": "Payfast", "status": "up"},
				"request" : {"time": requestTime, "method": req.method, "url": req.url},
				"response": {"statusCode": res.statusCode, "contentType": res._headers['content-type'], "error": ""}
			});

		info.save(function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Salvo com sucesso');
			}
		});

	});


	res.on('error', function(error) {
  	//console.log("error " + error);
	});



  	next();
};

module.exports = function () {
	return extractor;
};
