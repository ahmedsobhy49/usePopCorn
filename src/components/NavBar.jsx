/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
const NavBar = ({ searchedMoviesDataLength, searchValue, onSearch }) => {
  const inputElement = useRef(null);
  useEffect(function () {
    inputElement.current.focus();
  }, []);
  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <h1 className="logo">
          <span className="logo-emoji">🍿</span>
          <a href="#">
            <span className="logo-text">usePopCorn</span>
          </a>
        </h1>
      </div>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchValue}
          ref={inputElement}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="number-of-founded-movies-container">
        <p className="number-of-founded-movies">
          Found <span>{searchedMoviesDataLength}</span> Results
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
