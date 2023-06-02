import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';



 
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

     // os comentados eu vou tentar no fim de semana 
     
     
      /*
      const getOffers = () =>{
        
    
    }
        */

    return (
      <div>
            <h1>
              Hello, User
            </h1>
            
            
            {/*
            <Link to={`/Pages/NewBookOfferPage/${newbookofferpageId}`}>
            <button >
                New Book Offer
            </button>
            </Link>
            */}


      </div>
    )}


  export default ProfilePage;