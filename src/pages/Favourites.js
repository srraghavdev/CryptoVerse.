import React from "react";
import Header from "../components/common/Header";
import { global } from "../context/globalContext";
import { useContext } from "react";
import List from "../components/Dashboard/List";
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
import getallcoins from "../functions/getallcoins";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Footer from "../components/common/Footer";
function Favourites() {
  let { user, currency, render} = useContext(global);
  // user object of signed in user, currency set and render to force rerender when adding or removing coins from favs in the favs page
  const coins = JSON.parse(localStorage.getItem("favs"));
  // get favs from localstorage every page reload
  let [coindata, Setcoindata] = useState("");
  let [isLoading, SetisLoading] = useState(true);
  // getting useContext varaibles , coins from local storage, coindata and isLoading are useState variables for coindat and loader visibility
  useEffect(() => {
    if (user) {
      getData();
    } else {
      SetisLoading(false);
      // if user is logged in fetch data or Setloading to false
    }
  }, [currency]);

  useEffect(() => {
    if (coindata.length != 0) {
      let temp = JSON.parse(localStorage.getItem("favs"));
      let x = [...coindata];
      Setcoindata(x.filter((item) => temp.includes(item.id)));
    }
  }, [render]);
  // render is a useState varaible 
  async function getData() {
    try {
      SetisLoading(true);
      let x = await getallcoins(currency);
      // get all coins
      Setcoindata(x.filter((item) => coins.includes(item.id)));
      // setting coindata to coins that are present in localstorage
      SetisLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  // async getdata function which gets triggerred whenver currency gets chnaged
  return (
    <div>
      <Header></Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          <h1 style={{ textAlign: "center", color: "var(--blue)" }}>
            Your Favourites
          </h1>
          <div className="fav-container" style={{ padding: "1rem" }}>
            {user ? (
              <div>
                {coindata &&
                // coindata has all the coin favs and call List for each of them
                  coindata.map((element, index) => (
                    <List coin={element} isfav={true}></List>
                  ))}
              </div>
            ) : (
              // when user isn't logged in show this
              <h3 style={{ textAlign: "center" }}>
                Please{" "}
                <Link to="/login" className="hypertext">
                  Login
                </Link>{" "}
                to add favourites
              </h3>
            )}
            {user && coindata.length == 0 && (
              // user is logged in but has no favs added , show this
              <div className="nofav-mobile">
                <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
                  No favourites added
                </h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link to="/dashboard">
                    <Button
                      text={"Dashboard"}
                      onClick={() => console.log("1")}
                    ></Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default Favourites;
