var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var tipoMenu = Schema(
    {
        tipo: String,
        descripcion: String,
        dateAdded : {type: Date, default: Date.now}
      }
) 

module.exports = mongoose.model('tipoMenu', tipoMenu)