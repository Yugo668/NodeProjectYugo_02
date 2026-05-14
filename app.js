const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require('./routers/userRouter');
app.use('/usuarios', userRouter);

app.listen(3000, () => console.log("Servidor en puerto 3000"));