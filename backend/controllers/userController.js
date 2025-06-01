const User=require('../models/userModel')
const jwt=require('jsonwebtoken')//for authentication
const {OAuth2Client}=require('google-auth-library')//for goole oAuth token verificartion

const client=new OAuth2Client(process.env.GOOGLE_API_CLIENT_ID)


const verify=async(token)=>{
    try{
        const ticket=await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_API_CLIENT_ID
        })
        const payload=ticket.getPayload()
        
        return payload
    } catch (error){
        console.log(error)
    }
}
//creating token
const createToken=(_id)=>{
    //jwt.sign takes 3 arguments {payload},SECRET string,{options}
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'4h'})
}


//signup
const signupUser=async(req,res)=>{
    const {authorization}=req.headers
    if(!authorization){//not a google signup
        try{
            const {fName,lName,email,password,userType}=req.body
            const user=await User.signup(fName,lName,email,password,userType,0)//0 for idicate that this is not google oAuth
            const token=createToken(user._id)
            res.status(200).json({fName:user.fName,lName:user.lName,email:user.email,userType:user.userType,token})
        } catch (error){
            res.status(400).json({error:error.message})
        }
    }else{//a google signup
        try{
            const oauthtoken = authorization.split(' ')[1]//taking part after bearer
            const {given_name,family_name,email,sub}=await verify(oauthtoken)//sub is unique for user. we will use this as password
            const user= await User.signup(given_name,family_name,email,sub,'normal',1)//1 for idicate that this is google oAuth
            const token=createToken(user._id)
            
            res.status(200).json({fName:user.fName,lName:user.lName,email:user.email,userType:user.userType,token})
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

//login

const loginUser=async(req,res)=>{
    
    const {authorization}=req.headers
    
    
    if(!authorization){//not a google login
        try{
        
        const {email,password}=req.body
        const user=await User.login(email,password)
        const token=createToken(user._id)
        res.status(200).json({fName:user.fName,lName:user.lName,email:user.email,userType:user.userType,token})

        }catch (error){
            res.status(400).json({error:error.message})
            
    }}else {//a google login
        try{
            const oauthtoken = authorization.split(' ')[1]//taking part after bearer
            const {email,sub}=await verify(oauthtoken)
            const user= await User.login(email,sub)//since we used sub as the password when signup users
            const token=createToken(user._id)
            res.status(200).json({fName:user.fName,lName:user.lName,email:user.email,userType:user.userType,token})
        } catch(Error){
            console.log(Error.message)
            res.status(400).json({error:Error.message})
        }
    }
}




module.exports={signupUser,loginUser}