const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Home Page
router.get('/', userController.getHomePage);

// Adding to Cart
router.post('/home/cart/add/:productId', userController.addToHomeCart);

// Add to Cart
router.post('/cart/add/:productId', userController.addToCart);

// Update Quantity in Cart
router.post('/cart/update/:productId', userController.updateCartItemQuantity);

// Remove from Cart
router.post('/cart/remove/:productId', userController.removeCartItem);

// Cart Page
router.get('/cart', userController.getCartPage);

module.exports = router;