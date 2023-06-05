import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import NewBookOffer from './NewBookOfferPage';
import BooksAvailablePage from './BooksAvailablePage';
import EditBookOfferPage from './EditBookOfferPage';





 
const API_URL = "http://localhost:5005/";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const { id } = useParams();

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
    console.log(notes)
      useEffect(() => {
        fetchBooks();
      }, []);
      

    return (
      <div>
            <h1>
              Hello, User
            </h1>
          
        
            <Link to={`/Pages/NewBookOfferPage/${newbookofferpageId}`}>
            <button >New Book Offer</button>
            </Link>

            <Link to={`/offers/edit/${bookId}`}>
            <button>Edit Book</button>
            </Link>      
 
            <Link to="/offers">
            <button>Back to available books</button>
            </Link>
           


      </div>
    )}


  export default ProfilePage;