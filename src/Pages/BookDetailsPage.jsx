import {useState, useEffect} from 'react';
import axios from 'axios'; 
import {Link, useParams} from 'react-router-dom';

import booksService from "../Services/book.service";


function BookDetailsPage() {
    const [book, setBook] = useState(null);

    const {bookId} = useParams("");

    const getBook = () => {
        booksService.getBook(bookId)
        .then((response)=>{
            const oneBook = response.data;
            setBook(oneBook);
        })
        .catch((error)=>console.log(error));
    }

    useEffect(()=>{
        getBook();
      }, [])

  return (
    <div className="book-details">
      {book && (
        <div>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <h4>{book.genre}</h4>
          <p>{book.description}</p>
        </div>
      )}
        
      <Link to={`/offers/edit/${bookId}`}>
        <button>Edit Project</button>
      </Link>      
 
      <Link to="/offers">
        <button>Back to available books</button>
      </Link>
    </div>
  )
}

export default BookDetailsPage