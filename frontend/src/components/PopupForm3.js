import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '@emotion/react';

const PopupForm3 = ({donation})=>{
    const [doner, setDoner] = useState('')
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
        
        const donation_id = donation._id

        const data = {doner}
        const response = await fetch('/api/donate/' + donation_id, {
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
            setDoner('')
            setError(null)
            setEmptyValues([])
            console.log('Donation Updated',json)
            window.location.reload()
        }
    }

    return(
        <div className={(theme.palette.mode==='dark') ? 'popup-dark' : 'popup'}>
            <form className="create-book" onSubmit={handleSubmit}>
                <h3>Update the doner</h3>
                <label>Doner :</label>
                <input 
                    type="doner" 
                    value={doner}
                    onChange={(e) => setDoner(e.target.value)}
                    className={emptyValues.includes('doner')?'error':''}
                />
                <button>Update Donation</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default PopupForm3