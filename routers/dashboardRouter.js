const express=require('express')
const router=express.Router()
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken,(req, res)=>{
    res.status(200).send('Bienvenido al Dashboard: ' + req.user.info);
})
module.exports=router