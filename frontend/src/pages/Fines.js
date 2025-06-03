import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useEffect } from "react"
import FineDetails from "../components/FineDetails"

const Fines = () => {
    const {user} = useAuthContext()

    const [fines, setFines] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        setError(null)
        setFines([])

        const fetchFines = async () => {
            const response = await fetch('/api/fines', {
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(response.ok){
                console.log(json)
                setFines(json)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }

        if(user){
            fetchFines()
        }else{
            setError('You must be logged in!')
        }
    
    }, [user])

    return ( 
        <div className="allbooks">
            <div className="book">
                <h3>Showing All Fines</h3>
                {fines && fines.map(fine => (
                    <FineDetails key={fine._id} fine={fine}/>
                ))}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
     )
}

export default Fines