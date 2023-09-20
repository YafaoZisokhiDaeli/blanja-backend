const express = require('express')
const router = express.Router()
const transactionsController = require('../controller/transaction')
const {protect} = require('../middlewares/auth')

router.get('/cari', protect, transactionsController.searching)
router.get('/', protect, transactionsController.getAllTransaction)
router.get('/:id', protect, transactionsController.getTransaction)
router.post('/', protect, transactionsController.insertTransaction)
router.put('/:id', protect, transactionsController.editTransaction)
router.delete('/:id', protect, transactionsController.deleteTransaction)


module.exports = router