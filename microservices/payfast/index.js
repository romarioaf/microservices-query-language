var app = require('./config/custom-express')();

app.listen('3003', function () {
	console.log('Servidor Payfast em execução.');
});
