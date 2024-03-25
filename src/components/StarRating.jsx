import propTypes from "prop-types";
import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
};

function Star({
  i,
  onMouseEnter,
  onMouseLeave,
  onRate,
  handleFill,
  width,
  height,
}) {
  return (
    <span
      role="button"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "block",
        cursor: "pointer",
        marginRight: "1px",
      }}
      onMouseEnter={() => onMouseEnter(i)}
      onMouseLeave={onMouseLeave}
      onClick={() => onRate(i)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={handleFill(i)}
        viewBox="0 0 24 24"
        stroke="#FFD700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </span>
  );
}

Star.propTypes = {
  onRate: propTypes.func.isRequired,
  onMouseEnter: propTypes.func.isRequired,
  onMouseLeave: propTypes.func.isRequired,
  i: propTypes.number.isRequired,
  handleFill: propTypes.func.isRequired,
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
};

function StarRating({
  max = 5,
  width = 24,
  height = 24,
  numOfStarsFilled,
  setNumOfStarsFilled,
}) {
  const [tempNumOfStarsFilled, setTempNumOfStarsFilled] = useState(0);

  const arrayWithLengthOf10 = Array.from({ length: max });

  function handleClick(i) {
    setNumOfStarsFilled(() => i + 1);
  }

  function handleMouseLeave() {
    setTempNumOfStarsFilled(() => 0);
  }

  function handleMouseEnter(i) {
    setTempNumOfStarsFilled(() => i + 1);
  }

  function handleFill(i) {
    if (tempNumOfStarsFilled) {
      return i < tempNumOfStarsFilled ? "#FFD700" : "none";
    }
    return i < numOfStarsFilled ? "#FFD700" : "none";
  }

  return (
    <div style={containerStyle}>
      {arrayWithLengthOf10.map((_, i) => {
        return (
          <Star
            key={i}
            i={i}
            width={width}
            height={height}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onRate={handleClick}
            handleFill={handleFill}
          />
        );
      })}

      <p
        style={{
          fontSize: `${width - 8}px`,
          lineHeight: "1",
          margin: "0 0 0 0.7rem ",
        }}
      >
        {tempNumOfStarsFilled || numOfStarsFilled || ""}
      </p>
    </div>
  );
}

StarRating.propTypes = {
  max: propTypes.number.isRequired,
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  numOfStarsFilled: propTypes.number.isRequired,
  setNumOfStarsFilled: propTypes.func.isRequired,
};

export default StarRating;
