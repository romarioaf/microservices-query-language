function PagamentoRepository(connection) {
	this._connection = connection;
}

PagamentoRepository.prototype.salva = function (pagamento, callback) {
	this._connection.query('insert into pagamentos set ?', pagamento, callback);
}

PagamentoRepository.prototype.atualiza = function (pagamento, callback) {
	console.log(pagamento);
	this._connection.query('update pagamentos set status = ? where id = ?', [pagamento.status, pagamento.id], callback);
}

PagamentoRepository.prototype.lista = function (callback) {
	this._connection.query('select * from pagamentos', pagamento, callback);
}

PagamentoRepository.prototype.buscaPorId = function (id, callback) {
	this._connection.query('select * from pagamentos where id = ?', [id], callback);
}

PagamentoRepository.prototype.delete = function(pagamento, callback) {
	this._connection.query('delete from pagamentos where id = ?', [pagamento.id], callback);
}

module.exports = function () {
	return PagamentoRepository;
}
