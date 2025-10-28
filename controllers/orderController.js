'use strict'

var orderService = require('../services/orderService');

var orderController = {

    // Metodo para guardar ordenes
    saveOrder: async function (request, response) {
        try {
            var params = request.body;
            const orderStored = await orderService.saveOrder(params);
            return response.status(201).send({ message: '✅ Orden creada con éxito', order: orderStored });
        } catch (error) {
            if (error.message.includes('Stock insuficiente') || error.message.includes('vacía')) {
                return response.status(400).send({ message: `❌ ${error.message}` });
            }
            return response.status(500).send({ message: `❌ Error en el servidor: ${error.message}` });
        }
    },

    // Listar todas las ordenes
    getAllOrders: async function (request, response) {
        try {
            const orders = await orderService.getAll();
            return response.status(200).send({ orders });
        } catch (error) {
            if (error.message.includes('No se encontraron')) {
                return response.status(404).send({ message: '❌ No hay órdenes que mostrar...' });
            }
            return response.status(500).send({ message: '❌ Error en el servidor...', error: error.message });
        }
    },

    // Metodo para eliminar una orden
    deleteOrder: async function (request, response) {
        try {
            var orderId = request.params.id;
            const orderRemoved = await orderService.delete(orderId);
            return response.status(200).send({ message: '🗑️ Orden eliminada', order: orderRemoved });
        } catch (error) {
            if (error.message.includes('Documento no encontrado')) {
                return response.status(404).send({ message: '❌ Orden no encontrada para eliminar...' });
            }
            return response.status(500).send({ message: '❌ Error en el servidor...', error: error.message });
        }
    }
};

module.exports = orderController;