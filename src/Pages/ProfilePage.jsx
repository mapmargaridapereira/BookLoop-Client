import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/auth.context";

function ProfilePage() {
  const [thisUser, setUser] = useState(null);
  const { userId } = useParams();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");

  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const getUser = async () => {
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
  };

  useEffect(() => {
    getUser();
  }, []);

  /*   const fetchBooks = async () => {
    const response = await fetch("./NewBookOfferPage");
    const results = await response.json();
    setBooks(results);
  }; */

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  //review handling
  const handleContent = (e) => {
    setContent(e.target.value);
    console.log(e.target.value)
  };

  const saveNewReview = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/review/create/${userId}`,
        { content, rating },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {thisUser && (
        <>
          <h1>{thisUser.name}</h1>
          <img
            src={thisUser.profileImg}
            alt="thisUser face"
            className="user-pic"
            style={{ width: 100 }}
          />
          <p>Contact: {thisUser.email}</p>
          <p>
            About:
            {thisUser.about}
          </p>
          <ul>Offered Books: {thisUser.offeredBooks}</ul>
          <ul>Wished Books: {thisUser.wishedBooks}</ul>

          {/* form for reviews */}
          <form onSubmit={saveNewReview}>
            <label>Traded books with {thisUser.name}? Share how it went!</label>
            <br></br>
            <input
              type="text"
              name="content"
              value={content}
              onChange={handleContent}
            />
            <button type="submit">Submit Review</button>
          </form>
          <br></br>

          <p>
            Check what others have to say about trading with this user<br></br>
            {thisUser.reviews}
          </p>
          <br></br>
          <Link to="/offers/new">
            <button>New Book Offer</button>
          </Link>

          <Link to="/offers">
            <button>Back to available books</button>
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
