var mongoose = require('mongoose');

module.exports = function () {
	mongoose.Promise = global.Promise;
	return mongoose.connect('mongodb://localhost/mql_db', function (error) {
		if (error) {
			console.log("Erro ao conectar no mongodb:"+ error);
		} else {
			console.log("Conexão efetuada com o mongo.");
		}
	});
};
