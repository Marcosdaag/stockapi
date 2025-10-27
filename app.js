// Configuracion de express (servidor) y peticiones.
'use strict'

// Modulos
var express = require('express'); // Importo modulo de express
var bodyParser = require('body-parser'); // Importo modulo de bodyParser
var app = express();
var stockRoutes = require('./routes/stockRoutes'); // Importo modulo de rutas

// Middlewares, capa o metodo que se ejecuta antes de ejecutar la accion de un controlador o el resultado de la peticion
app.use(bodyParser.urlencoded({extended:false})); // Configuracion necesaria para bodyParser
app.use(bodyParser.json()); // Funcionalidad para pasar todos los datos recibidos a json

// Configuracion cabeceras => cors
app.use((req, res, next) => {

res.header('Access-Control-Allow-Origin', '*');

res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');

res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

next();

});

// Cargamos archivo de rutas
app.use('/', stockRoutes);

// Exportacion del modulo/archivo/fichero
module.exports = app;