import { useState } from "react"
import { useLogin } from "../hooks/useLogin";
import {GoogleLogin} from '@react-oauth/google'


const Login=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const {isLoading,error,login,googleLogin}=useLogin()


    const handleSubmit=async(e)=>{
        e.preventDefault()
        await login(email,password)
        if(login) window.location.href = "/"
    }

    const googleLoginSuccess=async (e)=>{
        await googleLogin(e)
        window.location.href = "/"
    }
    return (
        <div className="form-container">
            <form className="login" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label>Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <label>Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <button disabled={isLoading}>Log In</button>
                {error && <div className="error">{error}</div>} 
                <GoogleLogin
                onSuccess={googleLoginSuccess}
                onError={(error)=>console.log(error)}
                />
            </form>
        </div> 
    )
}

export default Login