const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reserveSchema = new Schema({
    book_id: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Reserve', reserveSchema)