import { Link } from "react-router-dom";

function Navbar() {
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
      <Link to="/profile">
        <button>Profile</button>
      </Link>

      <Link to="/editprofile">
        <button>Edit Profile</button>
      </Link>
    </nav>
  );
}

export default Navbar;
