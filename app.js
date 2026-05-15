const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter')
const connection=require('./database/connection')
const AuthRouter=require('./routers/authRouter')
const authRouter = require('./routers/authRouter')
const dashboardRouter=require('./routers/dashboardRouter')

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

app.listen(3000, () => console.log("Servidor en puerto 3000"));