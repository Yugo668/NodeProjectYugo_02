const UserAuth=require('../models/authModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

class AuthService{
    constructor(){}
    async register(data){
        data.password=bcrypt.hashSync(data.password, 10)
        return await UserAuth.create(data)

    }
    async filterByid(email){
        const userAuth=await UserAuth.findOne({ where: { email: email}})
        return userAuth

    }

    generatetoken(payload){
        const token=jwt.sign(payload,'secret-key')
        return token
    }
}
module.exports=AuthService