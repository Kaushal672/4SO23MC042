const { getProducts, getProduct } = require('../controllers/products');
const catchAsync = require('../utils/catchAsync');

const router = require('express').Router();

router.route('/:categoryname/products').get(catchAsync(getProducts));

router.route('/:categoryname/products/:productId').get(catchAsync(getProduct));

module.exports = router;
