import Button from "../Button";
import { useState } from "react";
import SearchedMovieItem from "./SearchedMovieItem";

const SearchedMoviesList = ({ searchedMoviesData, onSelect }) => {
  const [colapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed(!colapsed);
  };

  return (
    <>
      {searchedMoviesData.length ? (
        <Button
          value={colapsed ? "+" : "-"}
          className="colapse-btn"
          onClick={handleCollapse}
        />
      ) : (
        ""
      )}
      <div className="searched-movies-items-container">
        {!colapsed &&
          searchedMoviesData.map((movie) => (
            <SearchedMovieItem
              key={Math.random() * 10000}
              movie={movie}
              onSelect={onSelect}
            />
          ))}
      </div>
    </>
  );
};

export default SearchedMoviesList;
