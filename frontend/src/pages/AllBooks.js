import ListBooks from "../components/ListBooks";
import BookForm from "../components/BookForm";

const AllBooks = () => {
    return ( 
        <div className="allbooks two-panel">
            <div className="book left-panel">
            <ListBooks url={'/api/bookcrud'} />
            </div>
            <div className="book right-panel">
            <BookForm />
            </div>
        </div>
     );
}
 
export default AllBooks;

