import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar";

const API_URL = "http://localhost:5005";

function BooksAvailablePage() {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);

  const [isOffersArrayEmpty, setIsOffersArrayEmpty] = useState(false);


  const getAllbooks = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/api/offers`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbooks();
  }, []);

  const searchBooksAvailable = (queryString) => {
    let searchedOffers = books.filter((book) => {
        return book.title.toLowerCase().includes(queryString.toLowerCase());
    })

    if(searchedOffers.length === 0) {
        setIsOffersArrayEmpty(true);
    }

    setBooks(searchedOffers);  
}

  return (
    <div className="BooksAvailablePage">
    <SearchBar searchBooksAvailable={searchBooksAvailable}/>
      {books &&
        books.map((book) => {
          return (
            <div className="bookCard card" key={book._id}>
              <Link to={`/offers/${book._id}`}>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default BooksAvailablePage;
