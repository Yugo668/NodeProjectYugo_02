const ProductService = require('../services/productService');
const productService = new ProductService();

exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

exports.getLowStockAlerts = async (req, res) => {
    try {
        const alerts = await productService.getLowStockAlerts();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await productService.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.update(id, req.body);
        res.status(200).json({ mensaje: "Medicamento actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.delete(id); 
        res.status(200).json({ mensaje: "Medicamento eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};