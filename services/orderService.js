'use strict'

// Importamos Modelos y Servicios
var Order = require('../models/orderModel');
var BaseService = require('./baseService');
var productService = require('./productService');
var Product = require('../models/productModel');

class OrderService extends BaseService {

    constructor() {
        super(Order);
    }

    // Se sobreescribe getAll para filtrar por fecha de creacion
    async getAll() {
        const documents = await this.model.find({})
            .sort('-createdAt')
            .populate('products.product', 'name price brand') // Trae 'name' y 'price' del producto
            .exec();

        if (!documents || documents.length === 0) {
            throw new Error(`No se encontraron documentos en ${this.model.modelName}`);
        }

        return documents;
    }

    // getById trae tambien el nombre y el precio
    async getById(id) {
        const document = await this.model.findById(id)
            .populate('products.product', 'name price brand')
            .exec();

        if (!document) {
            throw new Error(`Documento no encontrado en ${this.model.modelName} con id: ${id}`);
        }

        return document;
    }


    // Logica para guardar una orden y verificar el stock
    async saveOrder(orderData) {
        let totalPrice = 0;
        let productsToSave = [];

        if (!orderData.items || orderData.items.length === 0) {
            throw new Error('La orden no puede estar vacía');
        }

        // --- BUCLE DE VERIFICACION ---
        // 1. Verificamos stock y calculamos el total
        for (const item of orderData.items) {

            const product = await productService.getById(item.productId);

            if (product.stock < item.quantity) {
                throw new Error(`Stock insuficiente para: ${product.name} (Stock: ${product.stock})`);
            }

            // Calculamos el total
            totalPrice += product.price * item.quantity;

            // Guardamos la referencia para la orden
            // CAMBIO AQUÍ: Agregamos la propiedad customName
            productsToSave.push({
                product: product._id,
                quantity: item.quantity,
                customName: item.customName || null // <--- NUEVA LÍNEA: Guarda el nombre manual o null
            });
        }

        // --- BUCLE DE ACTUALIZACIÓN ---
        // 2. Si todo está bien, descontamos el stock
        try {
            for (const item of orderData.items) {
                await productService.updateProduct(item.productId, {
                    $inc: { stock: -item.quantity }
                });
            }
        } catch (error) {
            throw new Error('Error crítico al actualizar el stock: ' + error.message);
        }

        // 3. Creamos la nueva orden
        const newOrder = new Order({
            products: productsToSave,
            total: totalPrice
        });

        try {
            const orderStored = await newOrder.save();
            return orderStored;
        } catch (error) {
            throw new Error('No se pudo guardar la orden: ' + error.message);
        }
    }

}

// Exportamos la instancia
module.exports = new OrderService();