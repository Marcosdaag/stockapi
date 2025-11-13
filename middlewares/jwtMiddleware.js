'use strict'

var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();

function verifyToken(req, res, next) {
    // El token normalmente se manda en headers: Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

    const token = authHeader.split(' ')[1]; // 'Bearer <token>'

    if (!token) return res.status(401).json({ message: 'Token inválido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // guardamos info del usuario en la request
        next(); // seguimos al controlador
    } catch (err) {
        res.status(403).json({ message: 'Token expirado o inválido' });
    }
}

module.exports = verifyToken;
