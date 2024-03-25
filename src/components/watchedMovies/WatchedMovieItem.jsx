/* eslint-disable react/prop-types */
import Button from "../Button";

const WatchedMovieItem = ({ movie, onRemove }) => {
  const { Title, Poster, imdbRating, Runtime, userRatingValue } = movie;

  return (
    <div className="watched-movie-item">
      <div className="image-and-data-container">
        <div className="image-container">
          <img src={Poster} alt={Title} />
        </div>
        <div className="movie-data">
          <h3 className="movie-title">{Title}</h3>
          <p className="movie-date">
            <span>⭐️ {imdbRating}</span>
            <span>🌟 {userRatingValue}</span>
            <span>⌛️ {Runtime || 0}</span>
          </p>
        </div>
      </div>
      <div>
        <Button
          value={"x"}
          onClick={() => {
            onRemove(Title);
          }}
          className={"remove-btn"}
        />
      </div>
    </div>
  );
};

export default WatchedMovieItem;
