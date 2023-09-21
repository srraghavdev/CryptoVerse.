import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./styles.css";
export default function SelectDays({ days, Setdays, noP }) {
  return (
    <div className="select-days">
      {!noP && <p>Price Change in the last </p>}
      {/* for single coin this would be true and false for the compare page */}
      <Select
      // sx prop for custom styling in mui m we use Select component
        sx={{
          height: "2.5rem",
          color: "var(--white)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
          },
          "& .MuiSvgIcon-root": {
            color: "var(--white)",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3a80e9",
            },
          },
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={days}
        // value is current days
        label="Days"
        onChange={Setdays}
        // onChange of dropdown we run Setdays
      >
        {/* hard coded with MenuItems with values of 7,30,..365 */}
        <MenuItem value={7}>7 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
        <MenuItem value={60}>60 Days</MenuItem>
        <MenuItem value={90}>90 Days</MenuItem>
        <MenuItem value={120}>120 Days</MenuItem>
        <MenuItem value={365}>365 Days</MenuItem>
      </Select>
    </div>
  );
}
