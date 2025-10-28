// Modulo que trae funciones y las asigna a una ruta con un metodo.
'use strict'

// Modulos
var express = require('express'); // Importo el modulo de express
var router = express.Router(); //Permite definir rutas y middlewares de forma modular y separada del objeto principal de la app
var productController = require('../controllers/productController'); // Importo modulo que tiene las funciones de productos
var orderController = require('../controllers/orderController'); // Importo el modulo que tiene las funciones de ordenes

// Rutas y sus respectivas funciones-metodos definidos en el controlador

// Productos
router.post('/new-product', productController.saveProduct);
router.get('/list-products', productController.getProducts);
router.get('/search', productController.searchProducts);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);


module.exports = router; // Exporto el modulo