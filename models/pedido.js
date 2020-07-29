var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Pedido = Schema(
    {
        mesa : String,
        dependiente : String,
        pedido : [],
        dateAdded : {type: Date, default: Date.now}
      }
) 

module.exports = mongoose.model('Pedido', Pedido)