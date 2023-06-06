import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/auth.context";

const API_URL = "http://localhost:5005/";

function ProfilePage() {
  const [thisUser, setUser] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/profile/${user._id}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("./NewBookOfferPage");
    const results = await response.json();
    setBooks(results);
  };

  const handleLogout = () => {
    AuthContext.logOutUser();
    navigate("/");
  };

  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <p>Email: {user.email}</p>
      <ul>Offered Books: {user.offeredBooks}</ul>
      <ul>Wished Books: {user.wishedBooks}</ul>
      <img src={user.profileImg} alt="user face" className='user-pic'/>
      

      <Link to="/offers/new">
        <button>New Book Offer</button>
      </Link>

      <Link to="/offers">
        <button>Back to available books</button>
      </Link>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
