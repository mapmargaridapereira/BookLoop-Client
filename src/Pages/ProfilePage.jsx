import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/auth.context";

function ProfilePage() {
  const [thisUser, setUser] = useState(null);
  const { userId } = useParams();
  const [content, setContent] = useState([]);
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
    console.log(e.target.value);
  };

  const saveNewReview = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/review/create/${userId}`,
        { content: content, rating: rating },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderReviews = () => {
    if (thisUser && thisUser.reviews && thisUser.reviews.length > 0) {
      return thisUser.reviews.map((review, index) => (
        <p key={index}>{review.content}</p>
      ));
    } else {
      return <p>No reviews available.</p>;
    }
  };

  return (
    <div className="profile-card">
      {thisUser && (
        <>
          <h2 className="p-4">{thisUser.name}</h2>
          <img
            src={thisUser.profileImg}
            alt="thisUser face"
            className="user-pic rounded-circle"
            style={{ width: 100 }}
          />
          <h3>About: </h3>
          <p>{thisUser.about}</p>
          <h3>Contact me at: </h3>
          <p>{thisUser.email}</p>

          {/* form for reviews */}
          <form onSubmit={saveNewReview}>
            <label className="profile-heading p-4 rounded">Traded books with {thisUser.name}? Share how it went!</label>
            <br></br>
            <input
            className="review-input"
              type="text"
              size="50"
              name="content"
              value={content}
              onChange={handleContent}
            />
            <br></br>
            <button className="pink-button" type="submit">Submit Review</button>
          </form>
          <br></br>
          {thisUser && (
        <>
          {/* ... */}
          <h2>Check what others have to say about trading with this user</h2>
          <br />
          <span className="review-results">
          {renderReviews()}
          </span>
          <br />
          {/* ... */}
        </>
      )}
          <br></br>
          <Link to="/offers/new">
            <button className="pink-button">New Book Offer</button>
          </Link>

          <Link to="/offers">
            <button className="pink-button">Back to available books</button>
          </Link>

          <button className="blue-button" onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
