const express = require('express')
const { addTransactionController, getAllTransactionController, editTransactionController, deleteTransactionController } = require('../controllers/transactionController')

const router = express.Router()

router.post('/add-transaction', addTransactionController)
router.post('/edit-transaction', editTransactionController)
router.post('/delete-transaction', deleteTransactionController)
router.post('/get-transaction', getAllTransactionController)

module.exports = router