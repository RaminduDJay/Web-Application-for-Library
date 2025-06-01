const Borrow = require('../models/borrowModel')
const Books = require('../models/bookModel')
const Reserve = require('../models/reserveModel')
const User = require('../models/userModel')
const Fines = require('../models/finesModel')
const {createFines} = require('./finesController')

const getAllBorrows = async (req, res) => {
    console.log(req.user)
    const user_type = req.user.userType
    const user_id = req.user._id
    if(user_type !== 'normal') {
        await Borrow.find({}).sort({createdAt:-1})
            .then(result => res.status(200).json(result))
            .catch(() => res.status(400).json({error: "Fetching borrow details failed"}))
    } else {
        await Borrow.find({user_id}).sort({createdAt:-1})
            .then(result => res.status(200).json(result))
            .catch(() => res.status(400).json({error: "Fetching borrow details failed"}))
    }
    
}

const createBorrow = async (req, res) => {
    const book_id = req.body.book_id
    const email = req.body.email
    const isReturned = 0;
    const duration = 2;
    
    const user = await User.findOne({email})
        .catch(() => res.status(400).json({error: "Invalid User Email"}))
    if(!user) res.status(400).json({error: "Invalid User Email"})

    const book = await Books.findOne({_id: book_id})
    const user_id = user._id;
    const title=book.title;
    const name=user.fName+' '+user.lName;
    await Borrow.create({user_id, book_id, duration, isReturned,email,title,name})
        .then(async (result) => {
            try {
                const reserve = await Reserve.findOne({user_id, book_id})
                if(reserve) {
                    const reserve_id = reserve._id
                    await Reserve.findOneAndDelete({_id: reserve_id})
                } else {
                    await Books.findByIdAndUpdate({_id:book_id},{nAvailable: book.nAvailable - 1})
                    .catch(err => res.status(404).json({error: err.message}))
                }

                res.status(200).json(result)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update book failed'})
            }
        })
        .catch(() => {
            res.status(400).json({error: "Creating a Borrowing failed"})
        })
    
}

const deleteBorrow = async (req, res) => {

    const borrow_id = req.params.borrow_id
    const fine = await Fines.findOne({borrow_id})

    const borrow = await Borrow.findOne({_id: borrow_id})

    if(borrow.isReturned) {
        if(!fine) {
            await Borrow.findOneAndDelete({_id: borrow_id})
                .then(result => res.status(200).json(result))
                .catch(err => res.status(404).json({error: err.message}))
        } else {
            res.status(500).json({error: "Cannot delete if there is a fine related to this bororw_id."})
        }
    } else {
        res.status(500).json({error: "Cannot delete if the book is not returned yet."})
    }
}

const returnBorrow = async (req, res) => {
    const borrow_id = req.body.borrow_id
    const borrow = await Borrow.findOne({_id: borrow_id})
    if(!borrow) res.status(400).json({error: "Fetching the borrow object failed"})

    const book_id = borrow.book_id
    const user_id = borrow.user_id
    req.body.book_id = book_id
    req.body.user_id = user_id
    const borrow_date = new Date(borrow.createdAt)
    const current_date = new Date()

    const date_diff = Math.floor((Math.abs(current_date - borrow_date))/(24 * 60 * 60 * 1000))
    const allowed_duration = borrow.duration * 7

    const book = await Books.findOne({_id: book_id})
    if(!book) res.status(400).json({error: "Fetching book details failed"})

    await Borrow.findOneAndUpdate({_id: borrow_id}, {isReturned: 1})
        .then(async (result) => {
            await Books.findOneAndUpdate({_id:book_id},{nAvailable: book.nAvailable + 1})
                .then(async () => {
                    if(date_diff >= allowed_duration) {
                        const amount = date_diff * 10
                    
                        req.body.amount=amount;
                        req.body.user_name=borrow.name
                        // await Fines.create({user_id, user_name, borrow_id, amount})
                        await createFines(req,res)
                    }else res.status(200).json(result)
                })
                .catch(err => res.status(400).json({error: "Updating the book failed"}))
        })
        .catch(err => res.status(400).json({error: "Updating the Borrow Failed"}))
}

module.exports = {
    getAllBorrows,
    createBorrow,
    deleteBorrow,
    returnBorrow
}