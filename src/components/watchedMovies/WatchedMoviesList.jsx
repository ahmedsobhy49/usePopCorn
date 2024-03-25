/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import Button from "../Button";
import WatchedMoviesStatistics from "../WatchedMoviesStatistics";
import WatchedMovieItem from "./WatchedMovieItem";
import { v4 as uuidv4 } from "uuid";

function WatchedMoviesList({ watchedMoviesData, setWatchedMoviesData }) {
  const [collapsed, setCollapsed] = useState(false);

  const calculateOverallAverage = useCallback(
    (key) => {
      if (watchedMoviesData.length === 0) return 0;

      const total = watchedMoviesData.reduce((acc, curr) => {
        const value = Number(curr[key]);
        const validValue = isNaN(value) ? 0 : value;
        return acc + validValue;
      }, 0);

      return (total / watchedMoviesData.length).toFixed(1);
    },
    [watchedMoviesData]
  );

  const calculateOverallUSERRatingAverage = useCallback(
    () => calculateOverallAverage("userRatingValue"),
    [calculateOverallAverage]
  );

  const calculateOverallRatingAverage = useCallback(
    () => calculateOverallAverage("imdbRating"),
    [calculateOverallAverage]
  );

  const calculateWatchingMoviesTime = useCallback(() => {
    return watchedMoviesData
      .reduce((acc, curr) => {
        const runtime = parseInt(curr.Runtime);
        const validRuntime = isNaN(runtime) ? 0 : runtime;
        return acc + validRuntime;
      }, 0)
      .toFixed(1);
  }, [watchedMoviesData]);

  const [overallRatingAverage, setOverallRatingAverage] = useState(
    calculateOverallRatingAverage()
  );

  const [overallUserRatingAverage, setOverallUserRatingAverage] = useState(
    calculateOverallUSERRatingAverage()
  );

  const [watchingMoviesTime, setWatchingMoviesTime] = useState(
    calculateWatchingMoviesTime()
  );

  useEffect(() => {
    const updateStatistics = () => {
      setOverallRatingAverage(calculateOverallRatingAverage());
      setOverallUserRatingAverage(calculateOverallUSERRatingAverage());
      setWatchingMoviesTime(calculateWatchingMoviesTime());
    };
    updateStatistics();
  }, [
    watchedMoviesData,
    calculateOverallRatingAverage,
    calculateOverallUSERRatingAverage,
    calculateWatchingMoviesTime,
  ]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleRemove = (title) => {
    setWatchedMoviesData((prevData) =>
      prevData.filter((movie) => movie.Title !== title)
    );
  };

  return (
    <>
      {watchedMoviesData.length ? (
        <Button
          value={collapsed ? "+" : "-"}
          className={"colapse-btn"}
          onClick={handleCollapse}
        />
      ) : (
        ""
      )}
      <WatchedMoviesStatistics
        watchedMoviesDataLength={watchedMoviesData.length}
        overallUserRatingAverage={+overallUserRatingAverage}
        overallRatingAverage={+overallRatingAverage}
        watchingMoviesTime={watchingMoviesTime}
      />
      <div className="watched-movies-items-container">
        {!collapsed &&
          watchedMoviesData.map((movie) => (
            <WatchedMovieItem
              key={uuidv4()}
              movie={{ ...movie }}
              onRemove={handleRemove}
            />
          ))}
      </div>
    </>
  );
}

export default WatchedMoviesList;
