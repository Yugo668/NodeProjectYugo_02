const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); 

// Rutas para la botica Nova Salud
router.get('/', productController.getProducts);
router.get('/alertas', productController.getLowStockAlerts);

// Registrar medicamento
router.post('/', productController.createProduct); 

// 🔽 AGREGA ESTA NUEVA LÍNEA AQUÍ ABAJO 🔽
router.delete('/:id', productController.deleteProduct); 

module.exports = router;