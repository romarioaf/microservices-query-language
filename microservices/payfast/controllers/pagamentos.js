
module.exports = function (app) {

	app.get('/pagamentos', function (req, res) {
		res.send('OK');
	});

	app.post('/pagamentos/pagamento', function(req, res) {
		var pagamento = req.body["pagamento"];

		req.assert("pagamento.forma_pagamento", "Forma de pagamento é obrigatória").notEmpty();
		req.assert("pagamento.valor", "Valor do pagamento é obrigatório e deve ser um decimal.").notEmpty().isFloat();
		req.assert("pagamento.moeda", "Moeda é obrigatória e o tamanho máximo é 3 caracteres.").notEmpty().len(3,3);

		pagamento.status = 'CRIADO';
		pagamento.data = new Date;

		if (pagamento.forma_pagamento == "cartao") {
			var cartao = req.body["cartao"];
		
			var clienteCartoes = new app.services.clienteCartoes();
			clienteCartoes.autoriza(cartao, function (exception, request, response, retorno) {
				console.log("Requisição retornou.");
				console.log(retorno, exception);
				res.status(201).json(retorno);
			});

		} else {

			var errors  = req.validationErrors();
			if (errors) {
				res.status(400).send(errors);
			}

			var connection = app.repository.connectionFactory();
			var pagamentoRepository = new app.repository.pagamentoRepository(connection);
			pagamentoRepository.salva(pagamento, function (error,  resultado) {
				if (error) {
					res.status('400').send(error);
				} else {
					pagamento.id = resultado.insertId;

					res.location('pagamentos/pagamento/'+ resultado.insertId);

					var response = {
						dados_do_pagamento : pagamento,
						links : [
						{
							href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
							rel: "confirmar",
							method: "PUT",

						},
						{
							href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
							rel: "cancelar",
							method: "DELETE",
							
						}]
					};

					res.status(201).json(response);
				}
			});

		}
		

	});

	app.put("/pagamentos/pagamento/:id", function (req, res) {

		var pagamento = {};
		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = 'CONFIRMADO';

		var connection = app.repository.connectionFactory();
		var pagamentoRepository = new app.repository.pagamentoRepository(connection);

		pagamentoRepository.atualiza(pagamento, function (error, resultado) {
			if (error) {
				res.status(500).send(error);
				return;
			} else {
				console.log("Pagamento criado.");
				res.send(pagamento);
			}
		});
	});

	app.delete('/pagamentos/pagamento/:id', function(req, res){
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    var connection = app.repository.connectionFactory();
    var pagamentoRepository = new app.repository.pagamentoRepository(connection);

    pagamentoRepository.atualiza(pagamento, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('pagamento cancelado');
        res.status(204).send(pagamento);
    });
  });
}




/*{
	"forma_de_pagamento" : "payfast",
	"vpalor" : 10.48,
	"moeda" : "BRL",
	"descricao" : "Criando um pagamento"
}*/