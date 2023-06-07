import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import booksService from "../Services/book.service";

import axios from "axios";

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

  const [bookImg, setBookImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    try {
      setLoading(true);

      //formData === enctype=multipart/formdata
      const uploadData = new FormData();

      //add the file to the formData
      uploadData.append("profileImg", e.target.files[0]);

      //send the file to our api
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/upload`,
        uploadData
      );

      console.log(response.data.fileUrl);
      setBookImg(response.data.fileUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Create a function that Handles Edit Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // make a PUT request to update the book
  const updateBookOffer = (e) => {
    e.preventDefault;

    const data = {
      bookImg: bookImg,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      publisher: book.publisher,
    };

    booksService
      .updateBook(bookId, data)
      .then(() => {
        navigate(`/offers/${bookId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create a delete book function
  const deleteBook = () => {
    booksService
      .deleteBook(bookId)
      .then(() => {
        navigate("/offers");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

        {/* for images */}
        <label htmlFor="profileImg" className="form-box">
          <p>Image</p>
          {bookImg ? (
            <>
              <img src={bookImg} alt="current" />
              <p className="small-buttons">Change Book Image</p>
            </>
          ) : (
            <i className="fa fa-3x fa-camera">
              <p>Add Book Image</p>
            </i>
          )}
          <input
            type="file"
            name="bookImg"
            id="bookImg"
            onChange={handleUpload}
            className="image-input"
            required
          />
        </label>

        <button type="submit">Submit Changes</button>
      </form>
      <button onClick={deleteBook}>Delete Book for Offer</button>
    </div>
  );
}

export default EditBookOfferPage;
