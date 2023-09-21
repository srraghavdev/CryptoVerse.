import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles.css";
function Loader() {
  return (
    <div className="loader-container">
      {/* circular progress from mui with custom styling check styles.css*/}
      <CircularProgress />
    </div>
  );
}

export default Loader;
