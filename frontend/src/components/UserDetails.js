import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const UserDetails = ({userRef}) => {
    const {user} = useAuthContext()
    const [error,setError]=useState(null)

   
    const handleDelete=async ()=>{
        var result=window.confirm(`Are you sure, you want to delete this user named "${userRef.fName} ${userRef.lName}"?`)
        if(result){
            console.log("confirm")
            const response=await fetch('/api/getuser/'+userRef._id,{
                method: 'DELETE',
                headers:{
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json=await response.json()
            if(response.ok){
                console.log(json)
                window.location.reload()
            }else{
                setError(json.error)
            }
        }
    }
    
    return ( 
        <div className="reservation-details">
            <div>
                <h4>User Name: {userRef.fName} {userRef.lName} </h4>
                <h5>User email: {userRef.email}</h5>
                <h5>User type: {userRef.userType}</h5>
                {error && <div className="error">{error}</div>}
            </div>
            <div className="book-detail-button">
                {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>}
             </div>
        </div>
         
     );
}
 
export default UserDetails;