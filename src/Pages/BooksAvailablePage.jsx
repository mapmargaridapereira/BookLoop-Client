import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function BooksAvailablePage() {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [isOffersArrayEmpty, setIsOffersArrayEmpty] = useState(false);

  const [booksSearch, setBooksSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllbooks = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/offers`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setBooks(response.data);
      setBooksSearch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbooks();
  }, []);



  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filter = [];

    books.map((book) => {
      if (
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        filter.push(book);
      }
    });

    setBooksSearch(filter);
    console.log(searchQuery);
  };

  return (
    <div className="BooksAvailablePage">

      <input type="text" value={searchQuery} onChange={handleSearch} />

      {books &&
        booksSearch.map((book) => {
          return (
            <div className="bookCard card" key={book._id}>
              <Link to={`/offers/${book._id}`}>
                <img src={book.bookImg} style={{ width: 200 }} />
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
