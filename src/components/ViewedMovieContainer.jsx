/* eslint-disable react/prop-types */

import RatingStarBox from "./RatingStarBox";
import Button from "./Button";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const ViewedMovieContainer = ({
  setSelectedMoviesDetails,
  selectedMoviesDetails,
  setNumOfStarsFilled,
  numOfStarsFilled,
  watchedMoviesData,
  setWatchedMoviesData,
  setSelectedID,
  selectedID,
  onClick,
  KEY,
}) => {
  const [colapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCollapse = () => {
    setCollapsed(!colapsed);
  };

  function handleAddMovieToList(userRatingValue) {
    const titleExists = watchedMoviesData.some(
      (movie) => movie.Title === selectedMoviesDetails.Title
    );
    if (!titleExists) {
      setWatchedMoviesData((curr) => [
        ...curr,
        { ...selectedMoviesDetails, userRatingValue },
      ]);
    } else {
      setWatchedMoviesData((curr) => [{ ...curr, userRatingValue }]);
      console.log("Movie already exists in the list.");
    }
    setSelectedID(null);
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        setIsLoading(false);
        setSelectedMoviesDetails(data);
      }
      fetchMovieDetails();
    },
    [selectedID, KEY, setSelectedMoviesDetails]
  );

  useEffect(() => {
    document.addEventListener("keydown", onClick);
    return () => {
      document.removeEventListener("keydown", onClick);
    };
  }, [onClick]);
  const {
    Title,
    Runtime,
    Poster,
    Released,
    Actors,
    Director,
    imdbRating,
    Genre,
    Plot,
  } = selectedMoviesDetails;

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;
    return () => {
      document.title = "usePopCorn";
    };
  }, [Title]);

  return (
    <>
      <Button
        value={colapsed ? "+" : "-"}
        className={"colapse-btn"}
        onClick={handleCollapse}
      />
      {!isLoading ? (
        colapsed || (
          <div>
            <button className="back-btn" onClick={() => onClick()}>
              ←
            </button>
            <div className="flex-col">
              <div className=" viewed-movie-container">
                <div className="image-container">
                  <img src={Poster} alt={Title} />
                </div>
                <div className="movie-title-and-released-and-runtime-and-genre-and-imdbRating-container">
                  <h2>{Title}</h2>
                  <p>
                    {Released}
                    <span className="dot">·</span>
                    {Runtime.toString() === "N/A" ? 0 : Runtime}
                  </p>
                  <p>{Genre}</p>
                  <p className="imdbRating">
                    <span>⭐️</span>
                    <span>{imdbRating} IMDb rating</span>
                  </p>
                </div>
              </div>
              <div>
                <RatingStarBox
                  onAdd={handleAddMovieToList}
                  setNumOfStarsFilled={setNumOfStarsFilled}
                  numOfStarsFilled={numOfStarsFilled}
                />
              </div>
              <div className="discreption-div">
                <p>{Plot}</p>
                <p>{Actors}</p>
                <p>Directed by {Director}</p>
              </div>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ViewedMovieContainer;
