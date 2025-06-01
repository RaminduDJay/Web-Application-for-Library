require('dotenv').config()//to use dotenv file
const express=require('express')
const mongoose=require('mongoose')//using mongoose 
//importing routers
const userRoutes=require('./routes/user')
const bookCrudRoutes=require('./routes/bookcrud')
const bookRoutes=require('./routes/books')
const reserveRoutes = require('./routes/reserveRoutes')
const finesRoutes=require('./routes/finesRoutes')
const borrowRoutes = require('./routes/borrowRoutes')
const donationRoutes = require('./routes/donationRoutes')
const getUserRoutes=require('./routes/getUserRoutes')
//express app
const app=express()
app.use(express.json())//for any req body is passes and attached to req obj body


//middleware - which run inbetween req and response
app.use((req,res,next)=>{//next should be used to pass to the next piece of middleware (for ex: routes)
    console.log(req.path,req.method);
    next()
})


//routes
/*
//can specify every route like this too. But importing from a different file is much cleaner
app.get('/',(req,res)=>{
    res.json({mssg:'Welcome to the app'});
})
*/
//routes by imported route files
//for user login and signups
app.use('/api/user',userRoutes)

//for BOOK CRUDS for Higher Admins
app.use('/api/bookcrud',bookCrudRoutes)

//for Book for normal users
app.use('/api/books',bookRoutes)

//for reservations
app.use('/api/reserve', reserveRoutes)

//for borrowing
app.use('/api/borrow', borrowRoutes)
//for donations
app.use('/api/donate', donationRoutes)
//for fines
app.use('/api/fines',finesRoutes)

//to get user details for a given id
app.use('/api/getuser',getUserRoutes)


//connect to database
mongoose.connect(process.env.MONGO_URI)//Async in nature, so this will return a promise
    .then(()=>{
        console.log("Connected to db successfully!")
        //listening for request
        app.listen(process.env.PORT,()=>{
            console.log('Listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


