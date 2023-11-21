const express = require('express')
const router = express.Router()

const addProductController = require('../controller/admin/addProduct')

router.get('/add-product', addProductController.getAddProduct)
router.post('/add-product', addProductController.postAddProduct)


module.exports = router;