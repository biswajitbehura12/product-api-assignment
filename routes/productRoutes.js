const express = require('express')
const router = express.Router()
//const auth = require('../middleware/authMiddleware');

const {
    getProductsFilters,UpdateProductDetails,

    createProduct,getProductsById
} = require('../controllers/product');

router.post('/create-product' ,createProduct);
router.post('/update-product' ,UpdateProductDetails);
router.get('/get-product-ById' ,getProductsById);
router.get('/get-product' ,getProductsFilters);





module.exports = router;