import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-div">
      <img
        src="https://i.imgur.com/RgK0kNf.jpg"
        className="main-home-img img-fluid"
      />
      <div className="typewriter-animation">
        <h1 className="textanimation" aria-label="I want to read">
          I want to read&nbsp;<span className="typewriter"></span>
        </h1>
      </div>
      <h1 className="home-text">
        Unlock a world of literary exchange at our online book trading platform,
        where stories find new homes and book enthusiasts connect.
      </h1>
      <br></br>
      <div className="getstarted-button-div">
      <Link to="/signup">
            <button className="getstarted-button">Get Started</button>
      </Link>
      </div>
    </div>
  );
}

export default HomePage;
