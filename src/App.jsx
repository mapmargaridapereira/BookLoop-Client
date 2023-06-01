import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import BooksAvailablePage from "./Pages/BooksAvailablePage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offers" element={<BooksAvailablePage />} />
      </Routes>
    </div>
  );
}

export default App;
