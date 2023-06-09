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
    <div>
    <div className="d-flex align-center justify-content-center">
    <div className="book-details m-5 p-5">
    <div className="p-3 m-3">
      {book && (
        <div>
          <h2>{book.title}</h2> by
          <h3>{book.author}</h3>
          <img src={book.bookImg} style={{ width: 200 }} />
          <h4>Genre:</h4> {book.genre}
          <h4>Language:</h4> {book.language}
          <h4>Publisher:</h4>{book.publisher}
          <h4>Description and book condition:</h4>
          <p>{book.description}</p>
          <a href={`/profile/${book.uploader._id}`}>
            Being offered by: {book.uploader.name}
          </a>
        </div>
      )}
      </div>
      </div>
</div>
      <Link to={`/offers/edit/${bookId}`}>
        <button className="align-center justify-content-center pink-button m-5">Edit Book</button>
      </Link>

      <Link to="/offers">
        <button className="lign-center justify-content-center blue-button m-5">Back to available books</button>
      </Link>
    </div>
  );
}

export default BookDetailsPage;
