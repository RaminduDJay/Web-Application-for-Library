import { useAuthContext } from "../hooks/useAuthContext";
import BookDetails from "../components/BookDetails";
import { useState } from "react";
import { useEffect } from "react";
const ListBooks = ({url}) => {
    const {user}=useAuthContext()
    const [books,setBooks]=useState([])
    const [error,setError]=useState(null)
    const [keyWord,setKeyWord]=useState('')//for search

    const handleSearch=(e)=>{
        setKeyWord(e.target.value)
    }
    useEffect(()=>{
        setError(null)
        setBooks([])
        const fetchBooks=async ()=>{
            const response = await fetch(url,{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })

            const json=await response.json()

            if(response.ok){
                console.log(json)
                setBooks(json)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }
        const fetchBooksWithoutToken=async ()=>{
            const response = await fetch(url)

            const json=await response.json()

            if(response.ok){
                console.log(json)
                setBooks(json)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }
        if(user){
            fetchBooks()
        }else if(url==='/api/books/available'){
            fetchBooksWithoutToken()
        }else{
            setError('You must be logged in!')
        }
    
    },[user,url])//user is a dependency
        
    return ( 
        <div className="allbooks">
            <div className="book">
            <input className="search-field" type="text" placeholder="Search by book title" onChange={handleSearch}/>
                {books && books.filter(obj=>obj.title.toLowerCase().includes(keyWord.toLowerCase())).map((book)=>(
                    <BookDetails key={book._id} book={book}/>
                ))}
            </div>
            {error && <div className="error">{error}</div>} 
        </div>
     );
}
 
export default ListBooks;