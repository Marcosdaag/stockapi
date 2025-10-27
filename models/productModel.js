// Modelo-Plantilla-Esquema de los objetos: Product
'use stict'

var mongoose = require('mongoose'); // Traigo el modulo de mongoose
var Schema = mongoose.Schema; // Traigo los esquemas de mongoose

//Creamos el esquema de Products
var ProdutSchema = Schema({
    brand: String,
    name: String,
    stock: Number,
    price: Number,
    normalizedName: String
});

/* 
* Exportamos el modulo con el modelo ProductSchema adentro,
* Como primer parametro se le pone 'Product' ya que mongoose lo
* pasa a minusculas y a plural, lo que quedaria como products el cual
* es el nombre de nuestra colecction.
*/
module.exports = mongoose.model('Product', ProdutSchema);