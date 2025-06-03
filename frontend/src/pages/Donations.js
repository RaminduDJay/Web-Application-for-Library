import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useEffect } from "react"
import DonationDetails from "../components/DonationDetails"

const Donations = () => {
    const {user} = useAuthContext()

    const [donations, setDonations] = useState([])
    const [error, setError] = useState(null)
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [totalCopies, setTotalCopies] = useState(null)
    const [doner, setDoner] = useState(null)
    const [emptyValues, setEmptyValues]=useState([])

    useEffect(()=>{
        setError(null)
        setDonations([])

        const fetchDonations = async () => {
            const response = await fetch('/api/donate', {
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(response.ok){
                console.log(json)
                setDonations(json)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }

        if(user){
            fetchDonations()
        }else{
            setError('You must be logged in!')
        }
    
    }, [user])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in!')
            return
        }
        
        const donation = {title, author, totalCopies, doner}
        const response = await fetch('/api/donate',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify(donation)
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            if(json.emptyValues) setEmptyValues(json.emptyValues)
        } else {
            setTitle('')
            setAuthor('')
            setTotalCopies('')
            setDoner('')
            setError(null)
            setEmptyValues([])
            console.log('New Donation added', json)
            window.location.reload()
        }
    }

    return ( 
        <div className="allbooks two-panel">
            <div className="book left-panel">
                <h3>Showing All Donations</h3>
                {donations && donations.map(donation => (
                    <DonationDetails key={donation._id} donation={donation}/>
                ))}
            </div>
            <div className="book right-panel">
                <h3>Donation Form</h3>
                <form className="create-book" onSubmit={handleSubmit}>
                    <label htmlFor="doner">Doner</label>
                    <input
                        type="text"
                        name="doner"
                        id="doner"
                        value={doner}
                        onChange={(e)=>setDoner(e.target.value)}
                        className={emptyValues.includes('doner')?'error':''}
                    />
                    <label htmlFor="totalCopies">Number of Copies</label>
                    <input
                        type="number"
                        name="totalCopies"
                        id="totalCopies"
                        value={totalCopies}
                        onChange={(e)=>setTotalCopies(e.target.value)}
                        className={emptyValues.includes('totalCopies')?'error':''}
                    />
                    <label htmlFor="title">Book Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className={emptyValues.includes('title')?'error':''}
                    />
                    <label htmlFor="author">Book's Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                        className={emptyValues.includes('author')?'error':''}
                    />
                    <button>Add Donation</button>
                </form>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
     )
}

export default Donations