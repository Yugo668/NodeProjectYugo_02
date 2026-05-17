const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Sale = sequelize.define('Sale', {
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Sale;