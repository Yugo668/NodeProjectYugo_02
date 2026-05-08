const express = require('express');
const app = express();
const userRouter = require('./routers/userRouter');
require('./database/connection');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor creado con express.js');
    console.log('Alguien entró a la raíz');
});

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Aplicación con express ejecutándose en el puerto 3000');
});