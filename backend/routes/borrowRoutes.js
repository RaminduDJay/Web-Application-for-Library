const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

// Controllers
const {
    getAllBorrows,
    createBorrow,
    deleteBorrow,
    returnBorrow,
} = require('../controllers/borrowController')

router.use(requireAuth)

router.get('/', getAllBorrows)

router.post('/', createBorrow)

router.delete('/:borrow_id', deleteBorrow)

router.patch('/', returnBorrow)

module.exports = router