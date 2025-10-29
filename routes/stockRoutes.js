// Modulo que trae funciones y las asigna a una ruta con un metodo.
'use strict'

// Modulos
var express = require('express'); // Importo el modulo de express
var router = express.Router(); //Permite definir rutas y middlewares de forma modular y separada del objeto principal de la app
var productController = require('../controllers/productController'); // Importo modulo que tiene las funciones de productos
var orderController = require('../controllers/orderController'); // Importo el modulo que tiene las funciones de ordenes

// Rutas y sus respectivas funciones-metodos definidos en el controlador

// Todos tienen la url similar pero lo que cambia es el metodo

// Productos
router.post('/products', productController.saveProduct);
router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getProducts);
router.get('/search', productController.searchProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Ordenes
router.post('/orders', orderController.saveOrder);
router.get('/orders', orderController.getAllOrders);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router; // Exporto el modulo