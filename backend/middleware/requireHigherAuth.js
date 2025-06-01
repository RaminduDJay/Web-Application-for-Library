const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

//checking for admin and librarian authentication

const requireHigherAuth= async (req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id}=jwt.verify(token,process.env.SECRET)
        const user=await User.findOne({_id})//appending the user into the req
        req.user=user
        if(user.userType!='librarian'&&user.userType!='admin') {//if user type is not these two, this throws an error
            // throw Error('Only Librarians and Admins can access this resource')
            return res.status(401).json({error:'Only Librarians and Admins can access this resource'})
        }
        next()
    }catch (error){
        console.log(error)
        res.status(401).json({error:'Request is not authorised'})
    }

}

module.exports=requireHigherAuth