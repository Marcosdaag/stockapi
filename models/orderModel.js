// Modelo-Plantilla-Esquema de los objetos: Order
'use strict'

var mongoose = require('mongoose'); // Traigo el modulo de mongoose
var Schema = mongoose.Schema; // Traigo los esquemas de mongoose

var OrderSchema = Schema({
    // Una orden tiene una lista de productos
    products: [
        {
            _id: false, // No necesitamos un _id para este sub-documento
            product: {
                type: Schema.ObjectId,
                ref: 'Product' // Referencia al modelo Product
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            customName: { type: String }
        }
    ],
    // El precio total de esta orden
    total: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    // Esto agrega 'createdAt' y 'updatedAt' automáticamente
    // Se usa para poder filtrar por fecha
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);