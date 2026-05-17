const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_comercial: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    principio_activo: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stock_minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
    },
    fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'productos',
    underscored: true, // Permite mapear guiones bajos sin problemas
    timestamps: false
});

module.exports = Product;