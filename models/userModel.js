const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const User = sequelize.define('User', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    telefono: { type: DataTypes.STRING }
});

module.exports = User;