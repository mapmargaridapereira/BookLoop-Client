import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import booksService from "../Services/book.service";



function BookDetailsPage() {
  const [book, setBook] = useState(null);

  const { bookId } = useParams("");
  const { userId } = useParams();

  const getBook = () => {
    booksService
      .getBook(bookId)
      .then((response) => {
        const oneBook = response.data;
        setBook(oneBook);
        console.log(oneBook);
      })
      .catch((error) => console.log(error));
  };

/*   const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      setUser(response.data);
      console.log("this user", response.data);
    } catch (error) {
      console.log(error);
    }
  }; */

  useEffect(() => {
    getBook();
    //getUser();
  }, []);

  return (
    <div className="book-details">
      {book && (
        <div>
          <img src={book.bookImg} />
          <h2>Title: {book.title}</h2>
          <h3>Author: {book.author}</h3>
          <h4>Genre: {book.genre}</h4>
          <h4>Language: {book.language}</h4>
          <h4>Publisher: {book.publisher}</h4>
          <h4>Description:</h4>
          <p>{book.description}</p>
          <a href={`/profile/${book.uploader._id}`}>
            Being offered by: {book.uploader.name}
          </a>
        </div>
      )}

      <Link to={`/offers/edit/${bookId}`}>
        <button>Edit Book</button>
      </Link>

      <Link to="/offers">
        <button>Back to available books</button>
      </Link>
    </div>
  );
}

export default BookDetailsPage;
