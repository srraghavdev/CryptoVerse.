import React from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../functions/convertNumbers";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { global } from "../../../context/globalContext";
import getcurrencysymbol from "../../../functions/getcurrencysymbol";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { ToastContainer, toast } from "react-toastify";
import { checkfav } from "../../../functions/checkfav";
import addFav from "../../../functions/addFav";
import removeFav from "../../../functions/removeFav";
function List({ coin, isfav }) {
  // List view is used for the fav page, so extra code is used to force update on adding and removing of coin 
  let { user, Setrender, docid,currency, render } = useContext(global);
  const [isAdded, SetisAdded] = useState(isfav ? true : checkfav(coin.id));
  // isAdded to toggle between showing added and remove for fav, initial value is dervied from checkfav function 
  function addfav(coinid) {
    if (user) {
      if (isfav) {
        // if coin is a part of fav then we can only remove it
        removeFav(coinid, docid, user.uid, SetisAdded, true);
        // if is Added is true then remove from fav
        Setrender(Math.random());
        // force re render on removing of coin
      } else if (isAdded) {
        removeFav(coinid, docid, user.uid, SetisAdded, true);
       // if is Added is true then remove from fav
      } else {
         // if is Added is false then add to fav
        addFav(coinid, docid, user.uid, SetisAdded, false);
      }
    } else {
      toast.error("Please login to add favourites");
      // error for logging in to add fav
    }
  }
  return (
    <Link to={`/coin/${coin.id}`}>
      {/* dyanmic routing */}
      <ToastContainer />
      <motion.tr
      // styles accoring to price_chnage_24h being less or greater than 0
        className="list-row"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tooltip title="Image" placement="bottom-start">
          <td className="td-image">
            <img src={coin.image} className="coin-logo"></img>
          </td>
        </Tooltip>
        <Tooltip title="Symbol and Name" placement="bottom-start">
          <td>
            <div className="name-col">
              <p className="coin-symbol td-text">{coin.symbol}</p>
              <p className="coin-name td-text">{coin.name}</p>
            </div>
          </td>
        </Tooltip>
        <Tooltip title="Price Change in 24Hrs" placement="bottom-start">
          {coin.price_change_percentage_24h > 0 ? (
            <td className="chip-flex custom-chip">
              <div className="price-chip td-chips mob-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip td-icon">
                <TrendingUpRoundedIcon></TrendingUpRoundedIcon>
              </div>
            </td>
          ) : (
            <td className="chip-flex custom-chip">
              <div className="price-chip chip-red td-chips mob-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip chip-red-icon td-icon">
                {coin.price_change_percentage_24h > 0 ? (
                  // trending up icon for greater than 0
                  <TrendingUpRoundedIcon></TrendingUpRoundedIcon>
                ) : (
                  // trending down icon for less than 0
                  <TrendingDownRoundedIcon></TrendingDownRoundedIcon>
                )}
              </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Current Price" placement="bottom">
          <td className="td-text">
            <h3
              className="coin-price td-center-align mob"
              style={
                coin.price_change_percentage_24h > 0
                  ? { color: "var(--green)" }
                  : { color: "var(--red)" }
              }
            >
              {/*adding symbol for each currency and converting to locale string */}
              {getcurrencysymbol(currency)}{" "}
              {coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <Tooltip title="Total Volume" placement="bottom-end">
          <td className="td-total-volume">
            <p className="total-volume td-right-align td-total-volume">
              {coin.total_volume.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-end">
          <td className="desktop-view">
            <p className="total-volume td-right-align">
              {/*adding symbol for each currency and converting to locale string */}
              {getcurrencysymbol(currency)} {coin.market_cap.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip
        // changing tooltoip title for when isAdded is true and false
          title={isAdded ? "Remove Favourite" : "Add Favourite"}
          placement="bottom-end"
        >
          <td className="desktop-view">
            <div
              className={
                coin.price_change_percentage_24h > 0
                  ? "icon-chip-star custom"
                  : "icon-chip-star chip-red-icon-star custom"
              }
              onClick={(event) => {
                event.preventDefault();
                addfav(coin.id);
                // add coin /remove coin
              }}
            >
              {/* // showing hollow icon for adding and filled for removing */}
              {isfav ? (
                <StarRateRoundedIcon></StarRateRoundedIcon>
              ) : isAdded ? (
               
                <StarRateRoundedIcon></StarRateRoundedIcon>
              ) : (
                <StarBorderRoundedIcon></StarBorderRoundedIcon>
              )}
            </div>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-end">
          <td className="mobile-view">
            <p className="total-volume td-right-align" id="volumemobile">
              {/*adding symbol for each currency and converting to locale string */}
              {getcurrencysymbol(currency)} {convertNumbers(coin.market_cap)}
            </p>
          </td>
        </Tooltip>
        <Tooltip
          title={isAdded ? "Remove Favourite" : "Add Favourite"}
          placement="bottom-end"
        >
          <td className="mobile-view">
            <div
              className={
                coin.price_change_percentage_24h > 0
                  ? "icon-chip-star custom"
                  : "icon-chip-star chip-red-icon-star custom"
              }
              onClick={(event) => {
                event.preventDefault();
                addfav(coin.id);
                // add coin /remove coin
              }}
            >
              {isAdded ? (
                // showing hollow icon for adding and filled for removing
                <StarRateRoundedIcon></StarRateRoundedIcon>
              ) : (
                <StarBorderRoundedIcon></StarBorderRoundedIcon>
              )}
            </div>
          </td>
        </Tooltip>
      </motion.tr>
    </Link>
  );
}

export default List;
