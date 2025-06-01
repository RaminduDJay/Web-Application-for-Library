import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext()

    
    const signup = async (fName,lName,email,password,userType='normal')=>{//default is normal type user
        setIsLoading(true)
        setError(null)
        const response = await fetch('api/user/signup',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({fName,lName,email,password,userType})
        })

        const json=await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            

            //saving the user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //updating the auth context
            dispatch({type:'LOGIN',payload:json})
            setIsLoading(false)
        }

    }

    const googleSignup=async (obj)=>{
        setIsLoading(true)
        setError(null)
        const {credential}=obj //taking credential token from the google response to the signin


        const response=await fetch('/api/user/signup',{
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
        }
        if(response.ok){
             //saving the user to local storage
             localStorage.setItem('user',JSON.stringify(json))

             //updating the auth context
             dispatch({type:'LOGIN',payload:json})
             setIsLoading(false)
        }
    }

    return {googleSignup,signup,isLoading,error}
}

