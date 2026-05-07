const express = require('express');
const path = require('path');
const app = express();
// const userRouter = require('./routers/userRouter'); // Make sure this file exists!

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
// app.use('/users', userRouter);

app.get('/', (req, res) => {
    const data = {
        title: 'Título de la página',
        message: 'Bienvenido a mi web',
        showMessage: true,
        items: ['Elemento 1', 'Elemento 2', 'Elemento 3']
    };

    // Pass the entire data object to the view
    res.render('index', data);
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});