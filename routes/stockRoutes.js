// Modulo que trae funciones y las asigna a una ruta con un metodo.
'use strict'


// Modulos
var express = require('express'); // Importo el modulo de express
var router = express.Router(); //Permite definir rutas y middlewares de forma modular y separada del objeto principal de la app
const { model } = require('mongoose'); // Traigo el modelo de mongoose
var pendingControllers = require('../controllers/pendingController'); // Importo modulo que tiene las funciones

// Rutas y sus respectivas funciones-metodos guardados en el controlador
// router.post('/save-pending', pendingControllers.savePending);


module.exports = router; // Exporto el modulo