const express = require('express')
const router = express.Router()
const categoryController = require('../controller/category')
const {protect} = require('../middlewares/auth')

router.get('/cari', protect, categoryController.searching)
router.get('/', protect, categoryController.getAllCategory)
router.get('/:id', protect, categoryController.getCategory)
router.post('/', protect, categoryController.insertCategory)
router.put('/:id', protect, categoryController.editCategory)
router.delete('/:id', protect, categoryController.deleteCategory)


module.exports = router