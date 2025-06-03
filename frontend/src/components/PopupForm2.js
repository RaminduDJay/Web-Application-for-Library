import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '@emotion/react';

const PopupForm2 = ({book})=>{
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [emptyValues, setEmptyValues] = useState([])//to keep empty fields
    const {user} = useAuthContext()
    const theme=useTheme()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in!')
            return
        }
        
        const book_id = book._id

        const borrow = {book_id, email}
        const response=await fetch('/api/borrow',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body:JSON.stringify(borrow)
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            if(json.emptyValues) setEmptyValues(json.emptyValues)
        }else {
            setEmail('')
            setError(null)
            setEmptyValues([])
            console.log('New Borrow Added',json)
            window.location.reload()
        }
    }

    return(
        <div className={(theme.palette.mode==='dark') ? 'popup-dark' : 'popup'}>
            <form className="create-book" onSubmit={handleSubmit}>
                <h3>Add a new Borrow record</h3>
                <label>User Email:</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emptyValues.includes('email')?'error':''}
                />
                <button>Create Borrow</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default PopupForm2