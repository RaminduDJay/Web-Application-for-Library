const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

// Controllers
const {
    getAllReserves,
    createReserve,
    deleteReserve
} = require('../controllers/reserveController')

router.use(requireAuth)

router.get('/', getAllReserves)

router.post('/:id', createReserve)

router.delete('/:id', deleteReserve)

module.exports = router