import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



import booksService from "../Services/book.service";

function NewBookOffer() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { user } = useContext(AuthContext);

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    publisher: "",
    bookImg: "",
  })


   //images
  const [bookImg, setBookImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    try {
      setLoading(true);

      //formData === enctype=multipart/formdata
      const uploadData = new FormData();

      //add the file to the formData
      uploadData.append("bookImg", e.target.files[0]);

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

  const handleSubmit = (e) =>{
    e.preventDefault();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const saveNewOffer = (e) => {
    e.preventDefault();

    const data = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      publisher: book.publisher,
      bookImg: book.bookImg
    } 

    booksService
      .createOffer(data, user._id)
      .then(() => {
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="NewBookOffer">
      <h3>Add New Book for Offer</h3>

      <form onSubmit={saveNewOffer}>
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
<label htmlFor="bookImg" className="form-box">
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewBookOffer;
