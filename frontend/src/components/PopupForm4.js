import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '@emotion/react';

const PopupForm4 = ({fine})=>{
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyValues, setEmptyValues] = useState([])
    const {user} = useAuthContext()
    const theme = useTheme()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in!')
            return
        }
        
        const fine_id = fine._id
        const data = {amount: amount}
        console.log("fff",fine_id)
        const response = await fetch('/api/fines/' + fine_id, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            if(json.emptyValues) setEmptyValues(json.emptyValues)
        }else {
            setAmount('')
            setError(null)
            setEmptyValues([])
            console.log('Fine Updated', json)
            window.location.reload()
        }
    }

    return(
        <div className={(theme.palette.mode==='dark') ? 'popup-dark' : 'popup'}>
            <form className="create-book" onSubmit={handleSubmit}>
                <h3>Update the amount</h3>
                <label>Amount :</label>
                <input 
                    type="amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={emptyValues.includes('amount')?'error':''}
                />
                <button>Update Amount</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default PopupForm4