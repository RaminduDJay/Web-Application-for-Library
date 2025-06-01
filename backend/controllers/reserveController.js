const Reserve = require('../models/reserveModel')
const Books = require('../models/bookModel')
const {updateBook}=require('./bookController')
const mongoose=require('mongoose')

const getAllReserves = async (req, res) => {
    
    const {_id, userType} = req.user
    // console.log(_id,userType)
    if(userType === 'normal'){
        await Reserve.find({user_id:_id}).sort({createdAt:-1})
            .then((result) => {
                console.log("dedeed")
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(404).json({error: err.message})
            })
    }else if (userType !== 'normal'){
        await Reserve.find().sort({createdAt:-1})
        .then((result) => {
            // console.log("dedswswweed")

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json({error: err.message})
        })
    }
}

const createReserve = async (req, res) => {

    const book_id = req.params.id
    const user_id = req.user._id
    const book = await Books.findOne({_id: book_id})

    await Reserve.create({book_id, title: book.title, user_id})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable - 1}
                await updateBook(req, res)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update book failed'})
            }
        })
        .catch(() => {
            res.status(400).json({error: "Creating a reservation failed"})
        })

    
}

const deleteReserve = async (req, res) => {
    //reservation id
    const {id} = req.params
    
    console.log(id)

    // const user_id = req.user._id
    try{
        const reserve = await Reserve.findById(id)
        
        const book_id=reserve.book_id;
        const book=await Books.findById(book_id)

        // console.log(book_id, user_id,"ddee")
        await Reserve.findByIdAndDelete(id)
            .then(async () => {
                try {
                    req.body = {nAvailable: book.nAvailable + 1}
                    await updateTheBook(book_id,req, res)
                } catch (error) {
                    console.log(error)
                    res.status(400).json({error: 'Update book failed'})
                }
            })
            .catch(() => {
                res.status(400).json({error: "Updating the available book count failed - Create Reservation"})
            })
        
    }
    catch(error){
        console.log(error)
        res.status(400).json({error: 'Reservation deletion failed'})
    }
    
}

//UPDATE a book
const updateTheBook=async (book_id,req,res)=>{
    const id=book_id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("dssds")

        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such book is listed'})
    }
    const CurrentBook=await Books.findById(id)
    if(req.body.totalCopies && (CurrentBook.totalCopies-CurrentBook.nAvailable)>req.body.totalCopies){
        //when there are reserved or borrowd books more than new total copies
        return res.status(404).json({error:'New total number of copies cannot accomadate current reservations and borrowed quantity.'})
    }
    const book=await Books.findByIdAndUpdate({_id:id},{...req.body})
    if(!book){
        return res.status(404).json({error:'No such book is listed'})
    }
    res.status(200).json(book)
}


module.exports = {
    getAllReserves,
    createReserve,
    deleteReserve
}