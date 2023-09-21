import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header";
import { coinObject } from "../functions/coinObject";
import List from "../components/Dashboard/List";
import Coininfo from "../components/Coin/Coininfo";
import coinData from "../functions/coinData";
import coinPrice from "../functions/coinPrice";
import LineChart from "../components/Coin/LineChart";
import SelectDays from "../components/Coin/SelectDays";
import PriceType from "../components/Coin/PriceType";
import setchartDatafn from "../functions/setchartDatafn";
import { useContext } from "react";
import { global } from "../context/globalContext";
import Footer from "../components/common/Footer";
function CoinPage() {
  let { id } = useParams();
  // extracting dynamic coinid for routing
  let [isLoading, SetisLoading] = useState(true);
  // loader visibilty
  let [coin, Setcoin] = useState([]);
  // coin will have the coindata
  let [days, Setdays] = useState(7);
  // days for the data to be fetched
  let [chartData, SetchartData] = useState({})
  // chartData for Linehcart chartdata
  let [coinp, Setcoinp] = useState({})
  // coinp for coinprices to be plotted
  let [pt, Setpt] = useState("prices")
  // price types for the data to be plotted
  let { currency } = useContext(global);
  // useParams hook provided by Reac Router allwos us to access all the dyanmic params (after :) using an object
  // order of api call , first we call coinData function which calls the api to get coinData and returns a promise and only when the data exists aka resolved promise we do a subsequent call to our coinPrice to get price hisotry
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [currency]);
// gets called when currency gets updated
  async function getData() {
    let result = await coinData(id);
    // fetching coindata for the mentioned coin id
    if (result) {
      coinObject(Setcoin, result, currency);
      // setting coindata for the current currency
      let temp = await coinPrice(id, days, currency);
      // fetching new coinprices for the days and currency
      Setcoinp(temp);
      // setting coinprices
      setchartDatafn(SetchartData, pt, temp);
      // setting new chartdata for updated coin prices for the current price type
      SetisLoading(false);
      // loader to false
    }
  }
  // whenever days change we refetch coinPrices with updated days value and update coinprices
  const handleChange = async (event) => {
    Setdays(event.target.value);
    let temp = await coinPrice(id, event.target.value, currency);
    Setcoinp(temp);
    setchartDatafn(SetchartData, pt, temp);
  };
  // whenever pricetype changes our drilled prop(pt useState variable) will get updated
  const handlePriceTypeChange = (event,newType) => {
    if (newType) {
      Setpt(newType);
      // setting new price type
      console.log(newType);
      setchartDatafn(SetchartData, newType, coinp);
      // making new chartdata for the line chart with new price type for the data to be plotted
    }
  };
  return (
    <div>
      <Header></Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="wrapper" style={{ padding: "0rem 1rem" }}>
          <List coin={coin}></List>{" "}
          {/* list view for the coin */}
        </div>
      )}
      {!isLoading && (
        <div className="wrapper">
          <SelectDays days={days} Setdays={handleChange}></SelectDays>
          {/* mui component to select days */}
          <PriceType
            handlePriceTypeChange={handlePriceTypeChange}
            pt={pt}
          ></PriceType>
          {/* pricetype component to chnage price type  */}
          <LineChart
            chartData={chartData}
            priceType={pt}
            multiAxis={false}
          ></LineChart>
          {/* line chart component from chartjs with multiaxis as false for normal chart */}
        </div>
      )}
      {!isLoading && <Coininfo heading={coin.name} desc={coin.desc}></Coininfo>}
      {/* coin info for description and heading */}
      <Footer></Footer>
    </div>
  );
}

export default CoinPage;
