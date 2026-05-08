const User = require('../models/userModel');

class UserService {
    constructor(){}
    async getAllUsers(){
        const users = await User.findAll();
        return users;
    }
    async filterById(id){
        const user = await User.findByPk(id);
        return user;
    }
    async create(data) {
        return await User.create(data);
    }
    async update(id, data) {
        return await User.update(data, {
            where: { id: id }
        });
    }
    async delete(id) {
        return await User.destroy({
            where: { id: id }
        });
    }
}
module.exports = UserService;