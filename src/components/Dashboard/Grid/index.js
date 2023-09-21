import React from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
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
function Grid({ coin }) {
  // throughout this component we are giving red styles for borders and hover when price_chnage_24h <0 and green when price_chnage_24h >0
  let { user, docid,currency } = useContext(global);
  let [isAdded, SetisAdded] = useState(checkfav(coin.id));
  // isAdded to toggle between showing added and remove for fav
  function addfav(coinid) {
    if (user) {
      // if user is logged in
      if (isAdded) {
        // if is Added is true then remove from fav
        removeFav(coinid, docid, user.uid, SetisAdded, isAdded);
      } else {
         // if is Added is false then add to fav
        addFav(coinid, docid, user.uid, SetisAdded, isAdded);
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
      <motion.div
      // styles accoring to price_chnage_24h being less or greater than 0
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 && "grid-red"
        }`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="info-flex">
          <img src={coin.image} className="coin-logo"></img>
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
          <div
            className={
              coin.price_change_percentage_24h > 0
                ? "icon-chip-star"
                : "icon-chip-star chip-red-icon-star"
            }
            onClick={(event) => {
              // add coin /remove coin
              event.preventDefault();
              addfav(coin.id);
            }}
          >
            {isAdded ? (
              // showing hollow icon for adding and filled for removing
              <StarRateRoundedIcon></StarRateRoundedIcon>
            ) : (
              <StarBorderRoundedIcon></StarBorderRoundedIcon>
            )}
          </div>
        </div>

        {coin.price_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip">
              {/* trending up icon for greater than 0 */}
              <TrendingUpRoundedIcon></TrendingUpRoundedIcon>
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red-icon">
              {coin.price_change_percentage_24h > 0 ? (
                // trending up icon for greater than 0
                <TrendingUpRoundedIcon></TrendingUpRoundedIcon>
              ) : (
                // trending up icon for LESS than 0
                <TrendingDownRoundedIcon></TrendingDownRoundedIcon>
              )}
            </div>
          </div>
        )}
        <div className="info-container">
          <h3
            className="coin-price"
            style={
              coin.price_change_percentage_24h > 0
                ? { color: "var(--green)" }
                : { color: "var(--red)" }
            }
          >
            {/*adding symbol for each currency and converting to locale string */}
            {getcurrencysymbol(currency)} {coin.current_price.toLocaleString()}
          </h3>
          <p className="total-volume">
            Total Volume : {coin.total_volume.toLocaleString()}
          </p>
          <p className="total-volume">
            Market Cap : {getcurrencysymbol(currency)}{" "}
            {coin.market_cap.toLocaleString()}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default Grid;
