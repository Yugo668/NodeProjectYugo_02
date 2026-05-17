const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const ProductService = require('../services/productService');
const productService = new ProductService();

router.get('/', verifyToken, async (req, res) => {
    try {
        const alertas = await productService.getLowStockAlerts();
        res.status(200).json({
        mensaje: 'Bienvenido al Dashboard: ' + req.user.info,
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;