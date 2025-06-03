import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import BorrowDetails from "./BorrowDetails";
const ListBorrow = () => {
    const {user}=useAuthContext()
    const [borrows,setBorrows]=useState([])
    const [error,setError]=useState(null)
    const [keyWord,setKeyWord]=useState('');
    const [onlyNotReturned,setOnlyNotReturned]=useState(false)
    const handleSearch=(e)=>{
        setKeyWord(e.target.value)
    }
    

    useEffect(()=>{
        setError(null)
        setBorrows([])
        const fetchBorrows = async ()=>{
                const response = await fetch('/api/borrow/',{
                    headers:{
                        'Authorization':`Bearer ${user.token}`
                    }
                })

            const json = await response.json()

            if(response.ok){
                console.log(json)
                setBorrows(json)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }
        if(user){
            fetchBorrows()
        }else{
            setError('You must be logged in!')
        }
    
    },[user])

    const handleCheckboxChange=()=>{
        setOnlyNotReturned(!onlyNotReturned)
    }
    return ( 
        <div className="allborrow">
            
          <div className="borrow-search">
            <input className="search-field" type="text" placeholder="Search by email" onChange={handleSearch}/>
            <div className="borrow-checkbox"><input
            type="checkbox"
            checked={onlyNotReturned}
            onChange={handleCheckboxChange}
            placeholder="Search by email"
            /><label>Show only borrows that are not returned</label></div>
          </div>
          <div className="borrow">
                {borrows && borrows.filter(obj=>obj.email.toLowerCase().includes(keyWord.toLowerCase())).map((borrow)=>(
                    (onlyNotReturned && borrow.isReturned)?'':<BorrowDetails key={borrow._id} borrow={borrow}/>
                ))}
            </div>
            {error && <div className="error">{error}</div>} 
        </div>
     );
}
 
export default ListBorrow;