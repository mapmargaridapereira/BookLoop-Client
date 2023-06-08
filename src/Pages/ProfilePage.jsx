import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/auth.context";

function ProfilePage() {
  const [thisUser, setUser] = useState(null);
  const { userId } = useParams();

  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [review, setReview] = useState({
    content: "",
    author: "",
    rating: "",
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const saveNewReview = (e) => {
    e.preventDefault();

    const reviewData = {
      content: "",
      author: "",
      rating: "",
    };

    const createNewReview = (reviewData, userId) => {
      return axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/review/create/${userId}`,
        reviewData
      );
    };
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
              value={review.content}
              onChange={handleSubmit}
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
