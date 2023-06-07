import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



import booksService from "./Services/book.service";

import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import BooksAvailablePage from "./Pages/BooksAvailablePage";
import NewBookOffer from "./Pages/NewBookOfferPage";
import BookDetailsPage from "./Pages/BookDetailsPage";
import SignUpPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import EditBookOfferPage from "./Pages/EditBookOfferPage";
import AboutUsPage from "./Pages/AboutUsPage";
import EditProfilePage from "./Pages/EditProfilePage";

function App() {
  const [offers, setOffers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const getAllbooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/offers`
      );
      setOffers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbooks();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offers" element={<BooksAvailablePage />} />
        <Route path="/offers/:bookId" element={<BookDetailsPage />} />
        <Route path="/offers/new" element={<NewBookOffer />} />
        <Route path="/offers/edit/:bookId" element={<EditBookOfferPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
