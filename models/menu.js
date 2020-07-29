var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Menu = Schema(
    {
        tipo: String,
        nombre: String,
        precio: Number,
        descripcion: String,
        url: String,
        cantidad: {type: Number, default: 0},
        dateAdded : {type: Date, default: Date.now}
      }
) 

module.exports = mongoose.model('Menu', Menu)