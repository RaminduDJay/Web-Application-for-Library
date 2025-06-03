import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from 'react'
import PopupForm3 from "./PopupForm3"

const DonationDetails = ({donation}) => {

    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleDelete = async () => {
        var result = window.confirm(`Are you sure, you want to delete the donation record ?`)
        if(result){
            console.log("confirmed")
            const response = await fetch('/api/donate/' + donation._id,{
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
                <h5>Doner : <font className="wei-norm">{donation.doner}</font></h5>
                <h5>Book Title : <font  className="wei-norm">{donation.title}</font></h5>
            </div>
            {isFormOpen && <PopupForm3 donation={donation}/>}
            <div>
                <span className="material-symbols-outlined" onClick={handleUpdate}>Edit</span>
                <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
            </div>
            {error && <div className="error">{error}</div>} 
        </div>
    )
}

export default DonationDetails