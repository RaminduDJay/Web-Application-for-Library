const mongoose = require('mongoose')
const Schema = mongoose.Schema

const borrowSchema = new Schema({
    book_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    isReturned: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Borrow', borrowSchema)