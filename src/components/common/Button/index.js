import React from "react";
import "./styles.css";

let Button = ({ text, onClick, outlined }) => {
  return (
    // basic div with built in styling with onClick passed as prop and differnt styling for outlined to true and false
    <div className={outlined ? "outline-btn" : "btn"} onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default Button;
