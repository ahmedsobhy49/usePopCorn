/* eslint-disable react/prop-types */
import StarRating from "./StarRating";
import { useState } from "react";
const RatingStarBox = ({ onAdd }) => {
  const [numOfStarsFilled, setNumOfStarsFilled] = useState(0);

  return (
    <div className="rating-star-box">
      <StarRating
        max={10}
        height={28}
        width={28}
        numOfStarsFilled={numOfStarsFilled}
        setNumOfStarsFilled={setNumOfStarsFilled}
      />
      {numOfStarsFilled ? (
        <button
          className="add-to-list-btn"
          onClick={() => {
            onAdd(numOfStarsFilled);
          }}
        >
          + Add to list
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default RatingStarBox;
