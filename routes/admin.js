// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin Panel - Add Product Page
router.get('/product', adminController.getProductList);

// Admin Panel - Product List Page
router.get('/product/add', adminController.getAddProductPage);

// Admin Panel - Add Product
router.post('/product/add', adminController.addProduct);

// Admin Panel - remove Product
router.post('/remove-product/:productId', adminController.removeProduct);

module.exports=router