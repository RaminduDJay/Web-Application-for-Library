const mongoose=require('mongoose')
const Schema=mongoose.Schema

const bookScehma=new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    nAvailable:{//number of currently available books
        type:Number,
        required:true
    },
    totalCopies:{
        type:Number,
        required:true
    }
})


bookScehma.index({title:1,author:1},{unique:true})
module.exports=mongoose.model('Books',bookScehma)

