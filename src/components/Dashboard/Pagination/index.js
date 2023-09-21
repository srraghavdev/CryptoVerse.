import React from "react";
import "./styles.css";
import Pagination from "@mui/material/Pagination";


function PaginationComponent({ page, handleChange, length }) {
  return (
    <div className="pagination-container">
      <Pagination
      // count is total number of pagination pages length/10 because we will have 10 coin per page
        count={length / 10}
        page={page}
        // current page number
        onChange={handleChange}
        // onCHnage funcion when we click on another page
        sx={{
          color: "var(--white)",
          //   styling for when we have selected a number
          "& .Mui-selected ": {
            backgroundColor: "var(--blue) !important",
            color: "#fff !important",
            borderColor: "var(--blue) !important",
          },
          //   setting styles for ellipsis
          "& .MuiPaginationItem-ellipsis": {
            border: "0px solid var(--grey) !important",
          },
          //   basic text styling for the component
          "& .MuiPaginationItem-text": {
            color: "var(--white)",
            border: "1px solid var(--grey)",
          },
        }}
      />
    </div>
  );
}
export default PaginationComponent;
