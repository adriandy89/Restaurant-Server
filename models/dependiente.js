var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Dependiente = Schema(
    {
        nombre: String,
        codigo: Number,
        admin: Boolean,
        dateAdded : {type: Date, default: Date.now}
      }
) 

module.exports = mongoose.model('Dependiente', Dependiente)