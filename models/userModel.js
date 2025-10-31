'use strict'

var mongoose = require('mongoose'); // Traigo el modulo de mongoose
var Schema = mongoose.Schema; // Traigo los esquemas de mongoose

const userSchema = Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, default: "vendedor" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);