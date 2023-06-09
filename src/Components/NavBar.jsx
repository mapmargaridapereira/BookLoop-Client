import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";

function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary rounded shadow sticky-top">
      <div className="container-fluid navbarcontainer">
      <a className="navbar-brand navbarelement" href="#"><img src="https://cdn.discordapp.com/attachments/1095679245965086811/1116454551428534372/image.png" className="img-fluid logoimage navbarelement"/></a>
      <div className="collapse navbar-collapse navbarelement" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbarelement">
      <li className="nav-item navbarelement">
      <Link to="/">
        <button className="btn navbar-button text-nowrap navbarelement border-0 rounded-0">Home</button>
      </Link>
      </li>
      <li className="nav-item">
      <Link to="/offers">
        <button className="btn navbar-button text-nowrap navbarelement border-0 rounded-0">Books Available</button>
      </Link>
      </li>
      <li className="nav-item">
      <Link to="/aboutus">
        <button className="btn navbar-button text-nowrap navbarelement border-0 rounded-0">About Us</button>
      </Link>
      </li>
      <li className="nav-item">
      <Link to="/signup">
        <button className="btn navbar-button text-nowrap navbarelement border-0 rounded-0">Sign Up</button>
      </Link>
      </li>
      <li className="nav-item">
      <Link to="/login">
        <button className="btn navbar-button text-nowrap navbarelement border-0 rounded-0">Login</button>
      </Link>
      </li>
      {/* temporary, until we add conditional rendering */}
      {user && (
        <li className="nav-item">
        <Link to={`/profile/${user._id}`}>
          <button className="btn navbar-button text-nowrap navbarelement border-0 rounded-0">Profile</button>
        </Link></li>
      )}
      {user && (
        <li className="nav-item">
      <Link to="/editprofile">
        <button className="btn navbar-button text-nowrap navbarelement border-0 rounded-0">Edit Profile</button>
      </Link></li>
      )}
      </ul>
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
