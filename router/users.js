const express = require('express');
const router = express.Router();

const userController = require('../controller/users');
const productController = require('../controller/products');
const orderController = require('../controller/orders');

// User Routes
router.get('/users', userController.index);
router.get('/user/:id', userController.show);
router.post('/user', userController.store);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

// Product Routes
router.get('/products', productController.index);
router.get('/products/:id', productController.show);
router.post('/products', productController.store);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

// Order Routes
router.get('/orders', orderController.index);
router.get('/orders/:id', orderController.show);
router.post('/orders', orderController.store);
router.put('/orders/:id', orderController.update);
router.delete('/orders/:id', orderController.delete);

module.exports = router;