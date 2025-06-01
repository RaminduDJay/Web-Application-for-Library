const express = require('express')
const router=express.Router()
const {
    getAllFines,
    getFine,
    createFines,
    deleteFines,
    updateFine
}=require('../controllers/finesController')

//get all fines
router.get('/', getAllFines)

//get fines for specific borrow id
router.get('/:user_id', getFine)

//POST new fines
router.post('/', createFines)

//delete fines
router.delete('/:borrow_id', deleteFines)

// Update fines
router.patch('/:id', updateFine)

module.exports = router