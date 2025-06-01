//These routes are for higher administatives of the system for CRUD operation of Books
const {
    createBook,
    getBooks,
    getAvailableBooks,
    getABook,
    deleteBook,
    updateBook
}=require('../controllers/bookController')
const express = require('express')
const requireHigherAuth=require('../middleware/requireHigherAuth')
const router=express.Router()

router.use(requireHigherAuth)//authenticate for librarians and admins before firing belows

//getAllBooks(regardless the availability)
router.get('/',getBooks)

//getAvailableBooks
router.get('/available',getAvailableBooks)

//get a book
router.get('/:id',getABook)

//POST new book
router.post('/',createBook)

//DELETE a book
router.delete('/:id',deleteBook)

//update a book
router.patch('/:id',updateBook)

module.exports=router