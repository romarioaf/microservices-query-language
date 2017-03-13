var mongoose = require('mongoose');

module.exports = function () {
  var serviceSchema = mongoose.Schema({
    name : {type: String},
    status : {type: String}
  });

  var requestSchema = mongoose.Schema({
    time : {type: String},
    method : {type: String},
    url : {type: String}
  });

  var responseSchema = mongoose.Schema({
    statusCode : {type: String},
    contentType: {type: String},
    erro : {type: Boolean}
  });

  var infoSchema = mongoose.Schema({
    service : serviceSchema,
    request : requestSchema,
    response: responseSchema
  });

  return mongoose.model('info', infoSchema);
};
