const SearchedMovieItem = ({ movie, onSelect }) => {
  const { Title, Poster, Year } = movie;

  return (
    <>
      <div
        className="searched-movie-item"
        onClick={() => onSelect(movie.imdbID)}
      >
        <div className="image-container">
          {/* movie image */}
          <img src={Poster} alt={Title} />
        </div>
        <div className="movie-data">
          {/* movie title */}
          <h3 className="movie-title">{Title}</h3>
          <p className="movie-date">
            {/* fixed */}
            <span>🗓️</span>
            {/* movie year */}
            <span>{Year}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchedMovieItem;
