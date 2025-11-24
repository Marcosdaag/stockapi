'use strict'

var mongoose = require('mongoose'); // Traigo el modulo de mongoose
var bcrypt = require('bcryptjs');
var dotenv = require('dotenv');
var User = require('../models/userModel');

dotenv.config(); // carga variables de entorno (.env)

// Conexión a tu base de datos MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => console.error("❌ Error al conectar:", err));

async function createUser(username, password, role = "vendedor") {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();
        console.log(`✅ Usuario creado: ${username}`);
    } catch (error) {
        console.error("❌ Error al crear usuario:", error.message);
    } finally {
        mongoose.connection.close();
    }
}

// 🔧 Acá creás tus usuarios manualmente
createUser("admin2", "1234", "vendedor");
