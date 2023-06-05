import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

import booksService from "../Services/book.service";

function NewBookOffer() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title : "",
    author: "",
    genre: "",
    description: "",
    publisher: ""
  })

  const handleSubmit = (e) =>{
    e.preventDefault();
    setBook({...book, [e.target.name] : e.target.value})
  }

  const saveNewOffer = (e) => {
    e.preventDefault();

    const data = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      publisher: book.publisher
    } 

    booksService.createOffer(data)
    .then(()=>{
      navigate("/profile")
    })
    .catch((error)=>console.log(error));
  }

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewBookOffer;
