import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function BooksAvailablePage() {
  const [books, setBooks] = useState([]);

  const getAllbooks = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/offers");
      setBooks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbooks();
  }, []);

  return (
    <div className="BooksAvailablePage">
      {books &&
        books.map((book) => {
          return (
            <div className="bookCard card" key={book._id}>
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
