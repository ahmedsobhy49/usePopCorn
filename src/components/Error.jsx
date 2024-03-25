import React from "react";

const Error = ({ message }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h4>⛔️ {message}</h4>
    </div>
  );
};

export default Error;
