const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login Page
router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

// Register Page
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.register);

router.get('/forget-password', authController.getForgetPasswordPage);
router.post('/change-password', authController.changePassword);

// Route to Admin Login Page
router.get('/admin', authController.redirectToAdminLoginPage);

// Admin Login Page
router.get('/admin/login', authController.getAdminLoginPage);
router.post('/admin/login', authController.adminLogin);

// Admin Logout
router.get('/admin/logout', authController.adminLogout);

module.exports = router;
