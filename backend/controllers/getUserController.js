const User=require('../models/userModel')
const mongoose=require('mongoose')

//get user details
const getUserDetails=async (req,res)=>{
    const {id}=req.params
    // console.log("uuu",id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such user is listed'})
    }
    try{
        const user=await User.findById(id)
        

        if(!user){//no book found
            return res.status(404).json({error:'No such user is listed'})
        }
        res.status(200).json(user)
    }catch (error){
        return res.status(400).json({error: "Error fetching user data!"})
    }
}

//get all user details
const getAllUsers=async (req,res)=>{
    
    try{
        console.log(req.user.userType)
        const result= (req.user.userType==='admin')?await User.find({}):await User.find({userType: { $ne: 'admin' }})
        if(!result){
            return res.status(404).json({error:'No users found!'})
        }
        res.status(200).json(result)
    }catch (error){
        return res.status(400).json({error: "Error fetching user data!"})
    }
}


//delete details
const deleteUser=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such user is listed'})
    }
    try{
        const user=await User.findById(id)
        
        if(!user){//no book found
            return res.status(404).json({error:'No such user is listed'})
        }
        const userDetials={fName:user.fName,lName:user.lName,email:user.email,userType:user.userType}
        if(req.user.userType!=='admin'){
            if(userDetials.userType!='normal'){
                 return res.status(400).json({error: "Permission Denied!"})
            }
        }

        await User.findByIdAndDelete(id)
            .then (result => res.status(200).json(result))
            .catch (() => res.status(400).json({error: "Error deleting user data!"}))

    }catch (error){
        return res.status(400).json({error: "Error fetching user data!"})
    }
   
}


module.exports={
    getUserDetails,
    getAllUsers,
    deleteUser
}