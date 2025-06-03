import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '@emotion/react';

//to convert to title case and trim
function toTitleCase(str) {
    str=str.trim()
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  }

const PopupForm = ({book})=>{
    const [error,setError]=useState(null)
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [totalCopies,setTotalCopies]=useState('')
    const {user}=useAuthContext()
    const theme=useTheme()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        var newDetails={}
        if(title!=='')newDetails={title:toTitleCase(title)}
        if(author!=='')newDetails={...newDetails,author:toTitleCase(author)}
        if(totalCopies!=='')newDetails={...newDetails,totalCopies:totalCopies}
        
        const response=await fetch('api/bookcrud/'+book._id,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body:JSON.stringify(newDetails)
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
        }else{
            setTitle('')
            setAuthor('')
            setTotalCopies('')
            setError(null)
            console.log("Book updated ",json)
            window.location.reload()
        }
    }
    return(
        <div className={(theme.palette.mode==='dark') ? 'popup-dark' : 'popup'}>
            <form onSubmit={handleSubmit}>
                <h3>Update Form for "{book.title}"</h3>
                
                <label>Book ID: {book._id}</label>
                <label>Current Title: {book.title}</label>
                <label>Current Author: {book.author}</label>
                <label>Current Total number of copies: {book.totalCopies}</label>
                <br></br>
                <label>New Title: </label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <label>New Author: </label>
                <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} />
                <label>New Total Copies: </label>
                <input type="number" value={totalCopies} onChange={(e)=>setTotalCopies(e.target.value)} />
                <button type='submit'>Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default PopupForm