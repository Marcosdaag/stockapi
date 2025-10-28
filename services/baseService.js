// Servicio base para logica basica utilizada en muchos TIPOS de OBJETOS
'use strict'

/**
 * Clase base genérica para operaciones CRUD.
 * Esta clase NO debe ser exportada como una instancia,
 * sino como una clase para ser extendida.
 */
class BaseService {

    // El constructor recibe un modelo como parametro (Schema de mongoose en este caso) y asigna un parametro modelo ese mismo modelo
    constructor(model) {
        this.model = model;
    }

    // Metodo para devolver todos los objetos de una coleccion
    async getAll() {
        const documents = await this.model.find({}).sort('name').exec();

        if (!documents || documents.length === 0) {
            throw new Error(`No se encontraron documentos en ${this.model.modelName}`);
        }

        return documents;
    }

    // Metodo para devolver un producto buscandolo por su ID
    async getById(id) {
        const document = await this.model.findById(id);

        if (!document) {
            throw new Error(`Documento no encontrado en ${this.model.modelName}`);
        }

        return document;
    }

    // Metodo para eliminacion de un item por su ID
    async delete(id) {
        const documentRemoved = await this.model.findByIdAndDelete(id);

        if (!documentRemoved) {
            throw new Error(`Documento no encontrado para eliminar en ${this.model.modelName}`);
        }

        return documentRemoved;
    }

    // NOTA: No incluimos create() o update() aquí porque
    // a menudo tienen lógica de negocio única
    // Es más limpio dejarlos en los servicios específicos.
}

module.exports = BaseService;