import { useState } from "react"
import { useSignup } from "../hooks/useSignup";
import {GoogleLogin} from '@react-oauth/google'


const Signup=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [fName,setFname]=useState('');
    const [lName,setLname]=useState('');
    const {googleSignup,signup,isLoading,error}=useSignup()

    const googleSignUpSuccess=async(e)=>{
        await googleSignup(e)
        window.location.href = "/"
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(fName,lName,email,password,'normal')//norml user signup
        if(signup) window.location.href = "/"
    }
    return (
        <div className="form-container">
            <form className="login" onSubmit={handleSubmit}>
                <h3>SignUp</h3>
                <label>First Name:</label>
                <input type="text" onChange={(e)=>setFname(e.target.value)} value={fName}/>
                <label>Last Name:</label>
                <input type="text" onChange={(e)=>setLname(e.target.value)} value={lName}/>
                <label>Email:</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <label>Password:</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <button disabled={isLoading}>SignUp</button>
                {error && <div className="error">{error}</div>} 
                <GoogleLogin
                onSuccess={googleSignUpSuccess}
                onError={(error)=>console.log(error)}
                />
            </form>
        </div>
        
    )
}

export default Signup