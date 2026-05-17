const express = require('express');
const app = express();
const cors = require('cors');

// --- CAMBIAMOS LOS ROUTERS POR LOS DE LA BOTICA ---
const productRouter = require('./routers/productRouter'); // Antes: userRouter
const authRouter = require('./routers/authRouter');       // Mantenemos tu login seguro
const dashboardRouter = require('./routers/dashboardRouter'); // El panel de alertas automáticas

// Importación de Sequelize para que levante la conexión al iniciar
const sequelize = require('./database/connection'); 

app.use(cors());
app.use(express.json());

// --- MAPEAMOS LAS NUEVAS RUTAS DE NOVA SALUD ---
app.use('/productos', productRouter);   // Aquí se manejará el stock de medicamentos
app.use('/auth', authRouter);           // Tu login con el payload "jojolete"
app.use('/dashboard', dashboardRouter); // El endpoint que escupirá las alertas críticas

app.listen(3000, () => console.log("Servidor en puerto 3000 y conectado a Nova Salud"));