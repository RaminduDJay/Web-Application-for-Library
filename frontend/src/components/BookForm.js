import { useAuthContext } from "../hooks/useAuthContext"
const {useState}=require("react")


const BookForm=()=>{
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [totalCopies,setTotalCopies]=useState('')
    const [error,setError]=useState(null)
    const [emptyValues,setEmptyValues]=useState([])//to keep empty fields
    const {user}=useAuthContext()


    const handleSubmit=async(e)=>{
        e.preventDefault()//stop auto refresh
        if(!user){
            setError('You must be logged in!')
            return
        }
        
        const book={title,author,totalCopies}
        const response=await fetch('/api/bookcrud',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body:JSON.stringify(book)
        })
        const json=await response.json()//response from server

        if(!response.ok){
            setError(json.error)
            if(json.emptyValues)setEmptyValues(json.emptyValues)
            
        }else {
            setTitle('')
            setAuthor('')
            setTotalCopies('')
            setError(null)
            setEmptyValues([])
            console.log('New Book added',json)
            window.location.reload()
        }
    }
    return(
        <form className="create-book" onSubmit={handleSubmit}>
            <h3>Add a New Book</h3>
            <label>Book Title:</label>
            <input 
                type="text" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className={emptyValues.includes('title')?'error':''}
            />
            <label>Author:</label>
            <input 
                type="text" 
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                className={emptyValues.includes('author')?'error':''}
            />
            <label>Number of Copies:</label>
            <input 
                type="number" 
                value={totalCopies}
                onChange={(e)=>setTotalCopies(e.target.value)}
                className={emptyValues.includes('totalCopies')?'error':''}
            />
            <button>Add Book</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BookForm