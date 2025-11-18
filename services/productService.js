'use strict'

// Importacion de modulos necesario
var utils = require('../utils/utils');
var Product = require('../models/productModel');
var BaseService = require('./baseService');

/**
 * Esta clase contiene toda la lógica de negocio para los productos.
 * No sabe nada sobre 'request' o 'response'.
 */
class ProductService extends BaseService {

    // Le asignamos al constructor de la clase Base el modelo de producto
    constructor() {
        super(Product);
    }

    // Metodo que se encarga de crear en nuevo producto y darle valor a los parametros aparte de manejar los errores
    async saveProduct(productData) {
        const product = new Product({
            brand: productData.brand,
            name: productData.name,
            stock: productData.stock,
            price: productData.Number(params.price) * 1.5,
            normalizedName: utils.normalizeText(productData.name)
        });

        try {
            const productStored = await product.save();
            return productStored;
        } catch (error) {
            throw new Error('No se pudo guardar el producto: ' + error.message);
        }
    }

    // Metodo para actualizar productos, buscandolos por ID e intentandolos actualizar con la nueva informacion
    async updateProduct(productId, updateData) {
        const productUpdated = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!productUpdated) {
            throw new Error('Producto no encontrado para actualizar');
        }

        return productUpdated;
    }

    // Metodo para buscar productos a travez de caracteres, normalizandolos y buscando coincidencias
    async searchProducts(query) {
        const normalizedQuery = utils.normalizeText(query);

        const products = await Product.find({
            normalizedName: { $regex: normalizedQuery, $options: 'i' }
        });

        if (products.length === 0) {
            throw new Error('No se encontraron productos');
        }

        return products;
    }
}

// Exportamos una *única instancia* de la clase (Patrón Singleton)
// para que todos los controladores usen la misma.
module.exports = new ProductService();