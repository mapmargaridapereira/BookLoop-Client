import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const API_URL = "http://localhost:5005";
 
 
function BooksAvailablePage() {
  const [books, setBooks] = useState([]);
 
  const getAllbooks = () => {
    axios
      .get(`${API_URL}/api/offers`)
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    getAllbooks();
  }, [] );
 
  
  return (
    <div className="BooksAvailablePage">
      
        {books.map((book) => {
          return (
            <div className="bookCard card" key={book._id} >
              <Link to={`/offers/${book._id}`}>
                <h3>{book.title}</h3>
              </Link>
            </div>
          );
        })}     
       
    </div>
  );
}
 
export default BooksAvailablePage;