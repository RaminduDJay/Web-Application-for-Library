const mongoose = require('mongoose')
const Schema = mongoose.Schema

const finesSchema = new Schema({
    user_id:{
        type:String,
        required:true
    },
    user_name: {
        type:String,
        required: true
    },
    borrow_id:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model('Fines',finesSchema)