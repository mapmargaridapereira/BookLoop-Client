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
      language: book.language,
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
      <h2 className="m-1 p-5">Edit Book for Offer</h2>

      <form className="d-flex flex-column align-content-center justify-content-center p-5 m-5" onSubmit={updateBookOffer}>
        <label><h4>Title:</h4></label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleSubmit}
        />
<br>

</br>
        <label><h4>Author:</h4></label>
        <textarea
          type="text"
          name="author"
          value={book.author}
          onChange={handleSubmit}
        />
<br></br>
        <label><h4>Genre:</h4></label>
        <textarea
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleSubmit}
        />
<br></br>
  <label><h4>Language:</h4></label>
        <textarea
          type="text"
          name="language"
          value={book.language}
          onChange={handleSubmit}
        />
<br></br>
        <label><h4>Description:</h4></label>
        <textarea
          type="text"
          name="description"
          value={book.description}
          onChange={handleSubmit}
        />
<br></br>
        <label><h4>Publisher:</h4></label>
        <textarea
          type="text"
          name="publisher"
          value={book.publisher}
          onChange={handleSubmit}
        />
<br></br>
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

        <button className="align-center justify-content-center m-5 pink-button"type="submit">Submit Changes</button>
      </form>
      <button className="align-center justify-content-center m-5 blue-button"onClick={deleteBook}>Delete Book for Offer</button>
    </div>
  );
}

export default EditBookOfferPage;
