import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '@emotion/react';

const Legend = ()=>{
    
    const {user}=useAuthContext()
    const theme=useTheme()
    
    return(
        <div className={(theme.palette.mode==='dark') ? 'popup-dark' : 'popup'}>
            <div className='legend-pop'><h4>Site Legend</h4>
            {user  && <div className='iconGroup'><span className="material-symbols-outlined">Delete</span>&nbsp;<span>Delete</span></div> } 
            {user && user.userType!=='normal' && <div className='iconGroup'> <span className="material-symbols-outlined">change_circle</span>&nbsp; <span>Update</span></div>}
            {user && user.userType!=='normal' &&<div className='iconGroup'> <span className="material-symbols-outlined">book_3</span> &nbsp;<span>Create Borrow</span></div>}
            {user &&<div className='iconGroup'> <span className="material-symbols-outlined" >anchor</span> &nbsp;<span>Create Reservation</span></div>}
            </div>
        </div>
    )
}

export default Legend