import React from "react";
import "../Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <h2>
        Loading<span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </h2>
    </div>
  );
};

export default Loading;
