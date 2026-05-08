const { Sequelize } = require('sequelize');
const { db } = require('../config');

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa a MySQL'))
    .catch(err => console.error('Error al conectar a MySQL:', err));

module.exports = sequelize;