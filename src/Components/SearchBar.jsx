import { useEffect, useState } from "react";
import axios from "axios";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; */
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";



function SearchBar() {
  const [allBooks, setAllBooks] = useState([]);
  const [searchString, setSearchString] = useState("");

  /*   const getAllbooks = async () => {
    let response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/api/offers`);
    setAllBooks(response.data);
    console.log("book titles", response.data);
  };

  useEffect(() => {
    getAllbooks();
  }, []); */

  const handleSearch = (e) => {
    setSearchString(e.target.value);

    searchOffers(e.target.value);
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(offers);

    const resultsArray = offers.filter(
      (book) =>
        book.title.includes(e.target.value) ||
        book.author.includes(e.target.value) ||
        book.genre.includes(e.target.value)
    );

    setSearchResults = resultsArray;
  };

  return (
    <>
      {allBooks && (
        <>
          <h2>Search Available Books</h2>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allBooks}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </>
      )}
    </>

    /* <input value={searchString} placeholder="Search by Title, Author, Genre" type="text" onChange={handleSearch} />
   <header>
        <form className="search" onSubmit={handleSubmit}>
            <input 
            className="search_input"
            type="text"
            id="search"
            onChange={handleSearchChange}
            />
            <button className="search_button" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
        </form>
    </header> */
  );
}

export default SearchBar;
