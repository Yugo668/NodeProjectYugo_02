const Sale = require('../models/saleModel');
const Product = require('../models/productModel');

class SaleService {
    async registerSale(data) {
        
        const newSale = await Sale.create({ total: data.total });
        
        for (let item of data.productos) {
            const product = await Product.findByPk(item.id);
            if (product) {
                await Product.update(
                    { stock: product.stock - item.cantidad },
                    { where: { id: item.id } }
                );
            }
        }
        return newSale;
    }
}
module.exports = SaleService;