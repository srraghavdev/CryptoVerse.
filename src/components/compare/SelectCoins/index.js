import React from "react";
import "./styles.css";
import { useState, useEffect } from "react";
import getallcoins from "../../../functions/getallcoins";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext } from "react";
import { global } from "../../../context/globalContext";
function SelectCoins({ coin1, onChangecoin1, coin2, onChangecoin2 }) {
  let [allcoins, Setallcoins] = useState([]);
  let { currency } = useContext(global);
  // fetching all the coins for the menu items in the dropdown
  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    let temp = await getallcoins(currency);
    // currency is the current currency
    Setallcoins(temp);
    // setting all coins as the fetched result
  }
  const styles = {
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
  };
  return (
    <div className="coins-flex">
      <p className="coin-text">Coin 1</p>
      <Select
        sx={styles}
        // sx is given the styles object
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={coin1}
        // value is coin1 drilled down
        label="Coin1"
        onChange={onChangecoin1}

      >
        {allcoins
          .filter((e) => e.id != coin2)
          .map((element) => (
            <MenuItem value={element.id}>{element.name}</MenuItem>
          ))}
        {/* filtering data so that menuitem list does not ahave option for coin2 for coin1 to avoid comparing two same coins */}
      </Select>

      <p className="coin-text">Coin 2</p>
      <Select
        sx={styles}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={coin2}
        // value is coin1 drilled down
        label="Coin2"
        onChange={onChangecoin2}
      >
        {allcoins
          .filter((e) => e.id != coin1)
          .map((element, index) => (
            <MenuItem value={element.id} key={index}>
              {element.name}
            </MenuItem>
          ))}
        {/* filtering data so that menuitem list does not ahave option for coin1 for coin2 to avoid comparing two same coins */}
      </Select>
    </div>
  );
}

export default SelectCoins;
