import ListBooks from "../components/ListBooks";

const AvailableBooks = () => {
    return ( 
        <div>
        <h1>Available Books</h1>
        <ListBooks url={'/api/books/available'} />
        
        </div>
     );
}
 
export default AvailableBooks;
