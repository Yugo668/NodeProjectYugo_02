const Product = require('../models/productModel');
const { Op } = require('sequelize');
const sequelize = require('../database/connection'); 

class ProductService {
    async getAllProducts() { return await Product.findAll(); }
    async filterById(id) { return await Product.findByPk(id); }
    async create(data) { return await Product.create(data); }
    async update(id, data) { return await Product.update(data, { where: { id } }); }
    async delete(id) { return await Product.destroy({ where: { id } }); }
    
    async getLowStockAlerts() {
        return await Product.findAll({
            where: {
                stock: { [Op.lte]: sequelize.col('stock_minimo') }
            }
        });
    }
}

module.exports = ProductService;