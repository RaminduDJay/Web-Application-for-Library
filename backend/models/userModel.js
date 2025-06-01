const mongoose=require('mongoose')
const schema=mongoose.Schema
const bcrypt=require('bcrypt')//for hashing passwords
const validator=require('validator')//to validate mails and passwords

const userSchema=new schema({
    fName:{
        type:String,
        required:true,
    },
    lName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{//admin,librarian or normal user
        type:String,
        required:true
    }
})


const formatNames=(name)=>{//to make first letter capital and rest simple
    name=name.toLowerCase()
    return name.replace(name[0],name[0].toUpperCase())
}



//signup static method
userSchema.statics.signup=async function (fName,lName,email,password,userType,isGoogleAuth=0){
    
    if(!fName || !lName || !email || !password || !userType){
        throw Error("All Fields must be filled!")
    }
    if(!validator.isEmail(email)){
        throw Error("Enter a valid email")
    }
    if(!isGoogleAuth){//if not google oauth , check for strength of password
        if(!validator.isStrongPassword(password)){
            throw Error("Plase enter a strong password")
    }}
    
    const exists=await this.findOne({email})
    
    if(exists){
        throw Error("Email is already in use!")
    }

    //hashing
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    fName=formatNames(fName)
    lName=formatNames(lName)
    const user=await this.create({fName:fName,lName:lName,email:email,password:hash,userType:userType})
   
    return user
}

//login method
userSchema.statics.login=async function(email,password){
    if(!email||!password){
        throw Error("All fields must be filled!")
    }

    const user=await this.findOne({email})
    if(!user){
        throw Error("Invalid credentials!")
    }

    const match=await bcrypt.compare(password,user.password)//compare the plain text password and hashed one
    //bcrypt pull out the salt of the hash and hash the given plain password with the pulled salt and compare
    if(!match){
        throw Error("Invalid credentials!")
    }

    return user
}

module.exports=mongoose.model('User',userSchema)