import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from 'react'
import PopupForm4 from "./PopupForm4"

const FineDetails = ({fine}) => {

    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleDelete = async () => {
        var result = window.confirm(`Are you sure, you want to delete the fine ?`)
        if(result){
            console.log("confirmed")
            const response = await fetch('/api/fines/' + fine.borrow_id, {
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                console.log(json)
                window.location.reload()
            }else{
                setError(json.error)
            }
        }
    }

    const handleUpdate = (e) => {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <div className="reservation-details">
            <div>
                <h5>User : <font className="wei-norm">{fine.user_name}</font></h5>
                <h5>Amount : <font className="wei-norm">{fine.amount}</font></h5>
                <h5>Created Date : <font className="wei-norm">{fine.createdAt}</font></h5>
            </div>
            {isFormOpen && <PopupForm4 fine={fine}/>}
            <div>
                <span className="material-symbols-outlined" onClick={handleUpdate}>Edit</span>
                <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
            </div>
            {error && <div className="error">{error}</div>} 
        </div>
    )
}

export default FineDetails