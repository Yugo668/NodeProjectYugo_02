const { Sequelize } = require('sequelize');
const { db } = require('../config');

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a MySQL');
        return sequelize.sync(); 
    })
    .then(() => {
        console.log('Tablas sincronizadas correctamente');
    })
    .catch(err => console.error('Error en MySQL:', err));

module.exports = sequelize;