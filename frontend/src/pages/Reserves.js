import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useEffect } from "react"
import ReservationsDetails from "../components/ReservationDetails"

const Reservations = () => {
    const {user} = useAuthContext()

    const [reservations,setReservations] = useState([])
    const [error,setError] = useState(null)

        useEffect(()=>{
            setError(null)
            setReservations([])

            const fetchReservations = async () => {
                const response = await fetch('/api/reserve', {
                    headers: {
                        'Authorization':`Bearer ${user.token}`
                    }
                })

                const json = await response.json()

                if(response.ok){
                    console.log(json)
                    console.log(json)
                    setReservations(json)
                }else{
                    console.log(json.error)
                    setError(json.error)
                }
            }

            if(user){
                fetchReservations()
            }else{
                setError('You must be logged in!')
            }
        
        }, [user])
    return ( 
        <div className="allbooks">
            <div className="book">
                <h3>Showing All Reservations</h3>
                {reservations && reservations.map(reservation => (
                    <ReservationsDetails key={reservation._id} reservation={reservation}/>
                ))}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
     );
}
 
export default Reservations