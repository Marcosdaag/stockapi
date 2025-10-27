// Modulo que establece la conexion a la data base.
'use strict'

// Variables de entorno
require('dotenv').config(); // Carga las variables del .env

// Modulos
var mongoose = require('mongoose'); // Importo modulo de mongoose
mongoose.Promise = global.Promise; // Le digo a mongoose que use promesas then y catch igual que JS
const port = process.env.PORT || 3000; // Puerto configurable
const app = require('./app'); // Importar app de Express


// Establecer conexión con MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
        // Intento conectarme a la base de datos dentro de atlas
    .then(() => {
        console.log("✅ Conexión a MongoDB Atlas establecida correctamente");

        // En caso de que se haya podido conectar a atlas, levanta el servidor en el puerto 3000
        app.listen(port, () => {
            console.log(`✅ Servidor funcionando en el puerto ${port}`);
        });
    })
    .catch((error) => console.error("❌ Error al conectar a MongoDB Atlas:", error));