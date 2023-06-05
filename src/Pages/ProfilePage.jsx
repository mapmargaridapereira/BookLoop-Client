import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


import { AuthContext } from '../Context/auth.context';


 
const API_URL = "http://localhost:5005/";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const getUser = async () => {
        try {
          const storedToken = localStorage.getItem('authToken');

          let response = await axios.get(`${API_URL}/api/user/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          setUser(response.data);
          console.log(response.data)

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
        authContext.logOutUser();
        navigate('/');
      };
      

    return (
      <div>
            <h1>
              Hello, User
            </h1>
          
        
            <Link to="/offers/new">
            <button >New Book Offer</button>
            </Link>
 
            <Link to="/offers">
            <button>Back to available books</button>
            </Link>

            <button onClick={handleLogout}>Logout</button>

      </div>
    )}


  export default ProfilePage;