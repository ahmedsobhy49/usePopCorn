/* eslint-disable react/prop-types */
const WatchedMoviesStatistics = ({
  watchedMoviesDataLength,
  overallUserRatingAverage,
  overallRatingAverage,
  watchingMoviesTime,
}) => {
  return (
    <div className="watched-movies-statistics-container">
      <div className="watched-movies-statistics-title">
        <p>MOVIES YOU WATCHED</p>
      </div>
      <div className="watched-movies-statistics-data">
        <span>📊 {watchedMoviesDataLength} movies</span>
        <span>⭐️ {overallRatingAverage}</span>
        <span>🌟 {overallUserRatingAverage}</span>
        <span>🎦 {watchingMoviesTime} min</span>
      </div>
    </div>
  );
};

export default WatchedMoviesStatistics;
