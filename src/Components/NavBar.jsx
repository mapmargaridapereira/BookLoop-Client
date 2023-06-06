import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";

function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/offers">
        <button>Books Available</button>
      </Link>

      <Link to="/aboutus">
        <button>About Us</button>
      </Link>

      <Link to="/signup">
        <button>Sign Up</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>
      {/* temporary, until we add conditional rendering */}
      {user && (
        <Link to={`/profile/${user._id}`}>
          <button>Profile</button>
        </Link>
      )}

      <Link to="/editprofile">
        <button>Edit Profile</button>
      </Link>
    </nav>
  );
}

export default Navbar;
