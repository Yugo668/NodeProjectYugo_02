const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Product = sequelize.define('Product', {
    nombre_comercial: { type: DataTypes.STRING, allowNull: false },
    principio_activo: { type: DataTypes.STRING },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    stock_minimo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    fecha_vencimiento: { type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = Product;