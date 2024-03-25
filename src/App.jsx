import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import MoviesContainer from "./components/MoviesContainer";
import Box from "./components/Box.jsx";
import SearchedMoviesList from "./components/searchedMovies/SearchedMoviesList.jsx";
import WatchedMoviesList from "./components/watchedMovies/WatchedMoviesList.jsx";
import ViewedMovieContainer from "./components/ViewedMovieContainer.jsx";
import Loading from "./components/Loading.jsx";
import Error from "./components/Error.jsx";
import { useLocalStorage } from "./assets/CustomHooks/useLocalStorage.js";
import { useControlledElement } from "./assets/CustomHooks/useControlledElement.js";
const KEY = "50f0575a";

function App() {
  const [value, handleChange] = useControlledElement();
  const [searchedMoviesData, setSearchedMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const [selectedMoviesDetails, setSelectedMoviesDetails] = useState({});
  const [watchedMoviesData, setWatchedMoviesData] = useLocalStorage("watched");
  useEffect(() => {
    const controller = new AbortController();
    const handleFetchError = (error) => {
      if (error.message.includes("Error is not a constructor")) {
        setError("movie not found");
      }

      if (error.message.includes("Failed to fetch")) {
        setError("something went wrong please check your internet connection");
      }
    };

    const fetchMovies = async () => {
      setError("");
      try {
        if (value.length <= 3) {
          return;
        }
        setIsLoading(true);

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${value}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(
            "something went wrong please check your internet connection"
          );
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("movie not found");
        }
        setSearchedMoviesData(data.Search);
      } catch (error) {
        setSearchedMoviesData([]);
        handleFetchError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (value === "") {
      setSearchedMoviesData([]);
      setError("");
      return;
    }

    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [value]);

  function handleSelect(id) {
    if (selectedID === id) {
      setSelectedID(null);
    } else {
      setSelectedID(() => id);
    }
  }

  function handleClickBackButton() {
    setSelectedID(null);
  }

  return (
    <>
      <NavBar
        searchedMoviesDataLength={searchedMoviesData.length}
        searchValue={value}
        onSearch={handleChange}
      />
      <MoviesContainer>
        <Box className={"searched-movies-container"}>
          {isLoading ? (
            <Loading />
          ) : !error ? (
            <SearchedMoviesList
              searchedMoviesData={searchedMoviesData}
              onSelect={handleSelect}
            />
          ) : (
            <Error message={error} />
          )}
        </Box>

        <Box className={"watched-movies-container"}>
          {!selectedID ? (
            <WatchedMoviesList
              watchedMoviesData={watchedMoviesData}
              setWatchedMoviesData={setWatchedMoviesData}
            />
          ) : (
            <ViewedMovieContainer
              setSelectedMoviesDetails={setSelectedMoviesDetails}
              selectedMoviesDetails={selectedMoviesDetails}
              setWatchedMoviesData={setWatchedMoviesData}
              watchedMoviesData={watchedMoviesData}
              onClick={handleClickBackButton}
              setSelectedID={setSelectedID}
              selectedID={selectedID}
              KEY={KEY}
            />
          )}
        </Box>
      </MoviesContainer>
    </>
  );
}

export default App;
