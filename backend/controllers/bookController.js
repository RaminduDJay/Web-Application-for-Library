const Books=require('../models/bookModel')
const mongoose=require('mongoose')

//to convert to title case and trim
function toTitleCase(str) {
    str=str.trim()
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  }


//CREATE a book
const createBook=async (req,res)=>{
    const {title,author,totalCopies}=req.body

    //checking for emoty fields
    let emptyValues=[]
    if(!title)emptyValues.push('title')
    if(!author)emptyValues.push('author')
    if(!totalCopies)emptyValues.push('totalCopies')
    if(emptyValues.length>0){
        return res.status(400).json({error:'Please fill in all the field',emptyValues})
    }

    try{
        const book=await Books.create({title:toTitleCase(title),author:toTitleCase(author),nAvailable:totalCopies,totalCopies})//at first  no of total copies = nAvailable
        res.status(200).json(book)

    }catch (error){
        res.status(400).json({error:error.message})
    }
}

//get all books
const getBooks=async (req,res)=>{
    
    const books=await Books.find()//returns all books
    
    res.status(200).json(books)
}


//getAvailabaleBooks
const getAvailableBooks=async (req,res)=>{
    
    const books=await Books.find({nAvailable:{$gt:0}})//returns all available books
    
    res.status(200).json(books)
}



//READ a book
const getABook=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such book is listed'})
    }
    const book=await Books.findById(id)
    if(!book){//no book found
        return res.status(404).json({error:'No such book is listed'})
    }
    res.status(200).json(book)
}


//UPDATE a book
const updateBook=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such book is listed'})
    }
    const CurrentBook=await Books.findById(id)
    if(req.body.totalCopies && (CurrentBook.totalCopies-CurrentBook.nAvailable)>req.body.totalCopies){
        //when there are reserved or borrowd books more than new total copies
        return res.status(404).json({error:'New total number of copies cannot accomadate current reservations and borrowed quantity.'})
    }
    if(req.body.totalCopies)req.body.nAvailable=CurrentBook.nAvailable+(req.body.totalCopies-CurrentBook.totalCopies);
    const book=await Books.findByIdAndUpdate({_id:id},{...req.body})
    if(!book){
        return res.status(404).json({error:'No such book is listed'})
    }
    res.status(200).json(book)
}



//DELETE a book
const deleteBook=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such book is listed'})
    }
    const {nAvailable,totalCopies}=await Books.findById(id)
    if(nAvailable!=totalCopies){
        return res.status(404).json({error:'Cannot delete book since there are borrowed or reserved copies of the book!'})
    }
    const book=await Books.findByIdAndDelete({_id:id})
    if(!book){
        return res.status(404).json({error:'No such book is listed'})
    }
    res.status(200).json(book)
}



module.exports={
    createBook,
    getBooks,
    getAvailableBooks,
    getABook,
    deleteBook,
    updateBook
}