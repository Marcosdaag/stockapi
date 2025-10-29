'use strict'

// El controlador AHORA solo importa el servicio
var productService = require('../services/productService');

// El controlador sigue siendo un objeto con métodos
var productController = {

    // Metodo para guardar nuevos productos
    saveProduct: async function (request, response) {
        try {
            var params = request.body;
            const productStored = await productService.saveProduct(params);

            return response.status(200).send({ message: '✅ Producto nuevo agregado con exito', product: productStored });
        } catch (error) {
            // Mensaje definido en el servicio
            return response.status(400).send({ message: error.message });
        }
    },

    // Metodo que devuelve una lista de productos
    getProducts: async function (request, response) {
        try {
            const products = await productService.getAll();

            return response.status(200).send({ products });

        } catch (error) {
            if (error.message.includes('No se encontraron documentos')) {
                return response.status(404).send({ message: '❌ No hay productos que mostrar...' });
            }
            return response.status(500).send({ message: '❌ Error en el servidor...', error: error.message });
        }
    },

    //Metodo para devolver un solo producto
    getProduct: async function (request, response) {
        var productId = request.params.id; // Id del objeto

        try {
            const product = await Pending.findById(productId);
            if (!product) {
                return response.status(404).send({ mesage: '❌ No hay producto que mostrar...' });
            } else {
                return response.status(200).send({ product });
            }
        }
        catch (error) {
            return response.status(500).send({ message: '❌ Error en el servidor...' });
        }
    },

    // Metodo para actualizar producto
    updateProduct: async function (request, response) {
        try {
            var productId = request.params.id;
            var update = request.body;
            const productUpdated = await productService.updateProduct(productId, update);

            return response.status(200).send({ product: productUpdated });
        } catch (error) {
            // 4. Enviar respuesta de error
            if (error.message.includes('Producto no encontrado')) {
                return response.status(404).send({ message: '❌ Producto no encontrado para actualizar...' });
            }
            return response.status(500).send({ message: '❌ Error en el servidor...', error: error.message });
        }
    },

    // Metodo para eliminar un producto
    deleteProduct: async function (request, response) {
        try {
            var productId = request.params.id;
            const productRemoved = await productService.delete(productId);

            return response.status(200).send({ product: productRemoved });

        } catch (error) {
            if (error.message.includes('Documento no encontrado')) {
                return response.status(404).send({ message: '❌ Producto no encontrado para eliminar...' });
            }
            return response.status(500).send({ message: '❌ Error en el servidor...', error: error.message });
        }
    },

    // Metodo para buscar productos
    searchProducts: async function (request, response) {
        try {
            const query = request.query.q ? request.query.q : '';
            const products = await productService.searchProducts(query);

            return response.status(200).send({ products });
        } catch (error) {
            // 4. Enviar respuesta de error
            if (error.message.includes('No se encontraron')) {
                return response.status(404).send({ message: '⚠️ No se encontraron productos...' });
            }
            return response.status(500).send({ message: '❌ Error al buscar productos...', error: error.message });
        }
    }

};

// Exporto el modulo
module.exports = productController;