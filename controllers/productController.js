const ProductService = require('../services/productService');
const productService = new ProductService();

// Listar todos los medicamentos
exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

// Alertas automáticas de bajo stock
exports.getLowStockAlerts = async (req, res) => {
    try {
        const alerts = await productService.getLowStockAlerts();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

// 🔽 AGREGA ESTA NUEVA FUNCIÓN AQUÍ ABAJO 🔽
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await productService.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};
// 🔽 AGREGA ESTA FUNCIÓN AL FINAL DE TU CONTROLADOR 🔽
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Llama al método de tu servicio que ejecuta el DELETE en Sequelize/MySQL
        await productService.delete(id); 
        res.status(200).json({ mensaje: "Medicamento eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};