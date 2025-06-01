const express = require('express')
const router=express.Router()
const {signupUser,loginUser}=require('../controllers/userController')//signup and login methods from controller
//login
// router.post('/login',(req,res)=>{
//     res.json({mssg:"User Login"});
// })
router.post('/login',loginUser)


//signup
// router.post('/signup',(req,res)=>{
//     res.json({mssg:"User Signup"});
// })
router.post('/signup',signupUser)


module.exports=router