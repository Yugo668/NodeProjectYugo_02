const AuthService=require('../services/authService')
const authService=new AuthService()
const bcrypt = require('bcrypt');

exports.register=async (req, res)=>{
    try {
        await authService.register(req.body)
        res.status(201).json({"message":"Usuario del administrador Registrado"})
    } catch (error) {
        res.status(500).json({"Error":error})
    }
}

exports.login=async (req, res)=>{
    try {
        const {email, password}=req.body
        const userAuth=await authService.filterByid(email)
        if (!userAuth) {
            return res.status(401).json({"message":"Usuario administrador no encontrado"})
        }
        const passwordMatch=bcrypt.compareSync(password,userAuth.password)
        
        if (!passwordMatch)
            return res.status(401).json({"message":"contraseña incorrecta"})
        const payload = {
            info: "jojolete",
            status: "admin_active",
            uid: Buffer.from(userAuth.email).toString('base64') 
        };

        const token = authService.generatetoken(payload);
        res.status(200).send(token) 

    } catch (error) {
        res.status(500).json({ "Error": error });
    }
}