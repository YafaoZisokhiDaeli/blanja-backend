const express = require('express')
const router = express.Router()
const productsController = require('../controller/products')
const { protect } = require('../middlewares/auth')
const { hitCacheProductDetail, clearCacheProductDetail } = require('../middlewares/redis')
const upload = require('../middlewares/upload')


router.get('/cari', productsController.searching)
router.get('/', productsController.getAllProduct)
router.get('/:id', hitCacheProductDetail, productsController.getProduct)
router.post('/', upload.single('photo'), productsController.insertProduct)
router.put('/:id', clearCacheProductDetail, upload.single('photo'), productsController.editProduct)
router.delete('/:id', clearCacheProductDetail, productsController.deleteProduct)



module.exports = router