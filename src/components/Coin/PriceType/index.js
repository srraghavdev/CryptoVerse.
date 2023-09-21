import "./styles.css";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PriceType({ handlePriceTypeChange, pt }) {
  return (
    <div className="toggle-container">
      <ToggleButtonGroup
        value={pt}
        // value is current price type
        exclusive
        onChange={handlePriceTypeChange}
        // on change of Toggle button group we run handlePriceTpyeChnage
        sx={{
          // custom styles , in mui sx prop is used to give styles
          "& .Mui-selected": {
            color: "rgb(25, 118, 210) !important",
          },
          borderColor: "var(--blue)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "set",
            color: "rgb(58, 128, 233)",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue)",
          },
        }}
      >
        // value is the key that would be for prices in the data fetched for coin prices

        <ToggleButton value="prices" aria-label="prices" className="toggle-btn">
          
          Price
        </ToggleButton>
        <ToggleButton
          value="market_caps"
          // value is the key that would be for market caps in the data fetched for coin prices
          aria-label="market caps"
          className="toggle-btn"
        >
          Market Cap
        </ToggleButton>
        <ToggleButton
          value="total_volumes"
          // value is the key that would be for total volumes in the data fetched for coin prices
          aria-label="total volumes"
          className="toggle-btn"
        >
          Total Volume
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
