const express = require('express')
const router = express.Router()

// Controllers
const {
    getAllDonations,
    createDonation,
    deleteDonation,
    updateDonation
} = require('../controllers/donationController')

router.get('/', getAllDonations)

router.post('/', createDonation)

router.delete('/:id', deleteDonation)

router.patch('/:id', updateDonation)

module.exports = router