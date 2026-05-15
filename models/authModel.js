const { DataTypes } = require('sequelize'); // Importa DataTypes
const sequelize = require('../database/connection');

const UserAuth = sequelize.define('UserAuth', {
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = UserAuth;