import { useAuthContext } from "../hooks/useAuthContext";
import UserDetails from "./UserDetails";
import { useState } from "react";
import { useEffect } from "react";

const ListUsers = () => {
    const {user}=useAuthContext()
    const [users,setUsers]=useState([])
    const [error,setError]=useState(null)
    const [keyWord,setKeyWord]=useState('')//for search

    const handleSearch=(e)=>{
        setKeyWord(e.target.value)
    }
    useEffect(()=>{
        setError(null)
        setUsers([])
        const fetchUsers=async ()=>{
            const response = await fetch('/api/getuser',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })

            const json=await response.json()

            if(response.ok){
                console.log(json)
                setUsers(json)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }
        if(user){
            fetchUsers()
        }else{
            setError('You must be logged in!')
        }
    
    },[user])//user is a dependency
        
    return ( 
        <div className="allbooks">
            <div className="book">
            <input className="search-field" type="text" placeholder="Search by user email" onChange={handleSearch}/>
                {users && users.filter(obj=>obj.email.toLowerCase().includes(keyWord.toLowerCase())).map((userRef)=>(
                    <UserDetails key={userRef._id} userRef={userRef}/>
                ))}
            </div>
            {error && <div className="error">{error}</div>} 
        </div>
     );
}
 
export default ListUsers;