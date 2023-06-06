import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import booksService from "../Services/book.service";

function EditBookOfferPage() {
  // Write State
  const [book, setBook] = useState({
    bookImg: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    publisher: "",
  });

  const { bookId } = useParams();

  const navigate = useNavigate();

  // Create a function that Handles Edit Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // make a PUT request to update the book
  const updateBookOffer = (e) => {
    e.preventDefault;

    const data = {
      bookImg: book.bookImg,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      publisher: book.publisher
    }

    booksService.updateBook(bookId, data)
    .then(() => {
      navigate(`/offers/${bookId}`);
    })
    .catch((error) => {
      console.log(error);
    });
  }


// Create a delete book function
const deleteBook = () => {
  booksService.deleteBook(bookId)
    .then(() => {
      navigate("/offers");
    })
    .catch((error) => {
      console.log(error);
    });
}

  return (
    <div className="edit-book-offer">
    <h3>Edit Book for Offer</h3>

    <form onSubmit={updateBookOffer}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleSubmit}
      />

      <label>Author:</label>
      <textarea
        type="text"
        name="author"
        value={book.author}
        onChange={handleSubmit}
      />

<label>Genre:</label>
      <textarea
        type="text"
        name="genre"
        value={book.genre}
        onChange={handleSubmit}
      />

<label>Description:</label>
      <textarea
        type="text"
        name="description"
        value={book.description}
        onChange={handleSubmit}
      />

<label>Publisher:</label>
      <textarea
        type="text"
        name="publisher"
        value={book.publisher}
        onChange={handleSubmit}
      />

      <button type="submit">Submit Changes</button>
    </form>
    <button onClick={deleteBook}>Delete Book for Offer</button>
  </div>
  );
}

export default EditBookOfferPage;
