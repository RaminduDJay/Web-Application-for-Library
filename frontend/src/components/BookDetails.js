import { useAuthContext } from "../hooks/useAuthContext"
import {useState} from 'react'
import PopupForm from "./PopupForm"
import PopupForm2 from "./PopupForm2"

const BookDetails=({book})=>{
    const {user}=useAuthContext()
    const [error,setError]=useState(null)
    const [isFormOpen,setIsFormOpen]=useState(false)
    const [isFormOpen2, setIsFormOpen2] = useState(false)
    
    const handleReservation = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in!')
            return
        }

        await fetch('/api/reserve/' + book._id, {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify({book_id: book._id})
        })
            .then(async result => {
                setError(null)
                console.log('New Reservation added', await result.json())
                window.location.reload()
            })
            .catch(err => {
                setError(err.error)
            })
    }

    const handleDelete=async ()=>{
        var result=window.confirm(`Are you sure, you want to delete the book named "${book.title}"?`)
        if(result){
            console.log("confrirm")
            const response=await fetch('/api/bookcrud/'+book._id,{
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

    const handleUpdate= (e) => {
        setIsFormOpen(!isFormOpen)
    }

    const handleBorrow = (e) => {
        setIsFormOpen2(!isFormOpen2)
    }

    return (
        <div className="book-details">
            <div className="book-details-info">
                <h4>{book.title}</h4>
                <p><strong>Author: </strong>{book.author}</p>
                <p><strong>Total number of copies: </strong>{book.totalCopies}</p>
                <p><strong>Number of available Copies: </strong>{book.nAvailable}</p>
                {isFormOpen && <PopupForm book={book}/>}
                {isFormOpen2 && <PopupForm2 book={book}/>}
                {error && <div className="error">{error}</div>} 
            </div>
            <div className="book-detail-button"> 
                {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>}
                {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleUpdate}>change_circle</span>}
                {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleBorrow}>book_3</span>}
                {user && user.userType==='normal' && <span className="material-symbols-outlined" onClick={handleReservation}>anchor</span>}
            </div>
        </div>
    )
}

export default BookDetails