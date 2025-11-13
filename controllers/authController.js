'use strict'

var User = require('../models/userModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();

var authController = {
    // Metodo para loguear
    login: async function (req, res) {
        
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

            // Generar JWT
            const token = jwt.sign(
                { id: user._id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '4h' }
            );

            res.json({
                message: 'Login exitoso',
                token,
                user: { username: user.username, role: user.role }
            });

        } catch (err) {
            res.status(500).json({ message: 'Error en el login', error: err.message });
        }
    }
};

module.exports = authController;