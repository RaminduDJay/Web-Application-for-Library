const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donateSchema = new Schema({
    book_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    doner: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Donate', donateSchema)