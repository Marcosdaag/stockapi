// Modulo intermediario entre la base de datos y como puede la API puede interactuar con los objetos tipo "product"
'use strict'

// Modelo del objeto tipo Product
var Product = require('../models/productModel'); // Modulo del esquema de producto

// Controlador con los distintos metodos
var productController = {
    // Metodos

    // Metodo para guardar nuevos productos
    saveProduct: function (request, response) {
        var product = new Product();
        var params = request.body;
        product.brand = params.brand;
        product.name = params.name;
        product.stock = params.stock;
        product.price = params.price;
        product.normalizedName = product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

        product.save().then((ProductStored) => {
            if (ProductStored) {
                return response.status(200).send({ message: '✅ Producto nuevo agregado con exito', product: ProductStored });
            }
        })
            .catch((error) => {
                if (!ProductStored) {
                    return response.status(404).send({ message: 'No sepudo guardar el producto...' });
                }
                if (error) {
                    return response.status(500).send({ message: 'Error en el servidor...' });
                }
            });
    },

    // Metodo que devuelve una lista de productos
    getProducts: async function (request, response) {
        try {
            const products = await Product.find({/* Condiciones de busqueda */ }).sort('name').exec();

            if (!products || products.length === 0) {
                return response.status(404).send({ message: '❌ No hay productos que mostrar...' });
            } else {
                return response.status(200).send({ products });
            }
        }
        catch (error) {
            return response.status(500).send({ message: '❌ Error en el servidor...' });
        }
    },

    // Metodo para actualizar productos
    updateProduct: function (request, response) {
        var productId = request.params.id;
        var update = request.body;

        Product.findByIdAndUpdate(productId, update, { new: true })
            .then((productUpdated) => {
                return response.status(200).send({ product: productUpdated });
            })
            .catch(() => {
                return response.status(404).send({ message: '❌ Producto no encontrado para actualizar...' });
            });
    },

    // Metodo para eliminar un producto
    deleteProduct: function (request, response) {
        var productId = request.params.id;

        Product.findByIdAndDelete(productId)
            .then((productRemoved) => {
                if (productRemoved) {
                    return response.status(200).send({ product: productRemoved });
                } else {
                    return response.status(404).send({ mesage: '❌ Producto no encontrado para eliminar...' });
                }
            })
            .catch((error) => {
                return response.status(500).send({ message: '❌ Error en el servidor...', error });
            });
    }
};

// Exporto el modulo
module.exports = productController;
