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
    </nav>
  );
}
 
export default Navbar;