var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Mesa = Schema(
    {
        numero: String,
        descripcion: String,
        dateAdded : {type: Date, default: Date.now}
      }
) 

module.exports = mongoose.model('Mesa', Mesa)