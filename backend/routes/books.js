const {getAvailableBooks,getABook}=require('../controllers/bookController')
const express = require('express')
const router=express.Router()


//getAvailableBooks
router.get('/available',getAvailableBooks)
//get a book
router.get('/:id',getABook)

module.exports=router