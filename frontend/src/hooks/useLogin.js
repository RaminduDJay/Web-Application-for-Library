import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext()

    const login=async (email,password)=>{
        setError(null)
        setIsLoading(true)

        const response=await fetch('/api/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })

        const json=await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //saving to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //updating authCOntext
            dispatch({type:'LOGIN',payload:json})
            setIsLoading(false)
        }
    }

    const googleLogin=async (obj)=>{
        setIsLoading(true)
        setError(null)
        const {credential}=obj //taking credential token from the google response to the signin

       
        const response=await fetch('/api/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${credential}`
            }
        })

        const json=await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            // console.log(error)
        }
        if(response.ok){
             //saving the user to local storage
             localStorage.setItem('user',JSON.stringify(json))

             //updating the auth context
             dispatch({type:'LOGIN',payload:json})
             setIsLoading(false)
        }
    }
    return {googleLogin,login,isLoading,error}
}