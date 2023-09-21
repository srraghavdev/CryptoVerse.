import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import SelectCoins from "../components/compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import coinPrice from "../functions/coinPrice";
import coinData from "../functions/coinData";
import List from "../components/Dashboard/List";
import { coinObject } from "../functions/coinObject";
import Coininfo from "../components/Coin/Coininfo";
import LineChart from "../components/Coin/LineChart";
import setchartDatafn from "../functions/setchartDatafn";
import PriceType from "../components/Coin/PriceType";
import Loader from "../components/common/Loader";
import { useContext } from "react";
import { global } from "../context/globalContext";
import Footer from "../components/common/Footer";
function ComparePage() {
  let [coin1, Setcoin1] = useState("bitcoin");
  let [coin2, Setcoin2] = useState("ethereum");
  let [coin1Data, Setcoin1Data] = useState("");
  let [coin2Data, Setcoin2Data] = useState("");
  let [coin1prices, Setcoin1prices] = useState("");
  let [coin2prices, Setcoin2prices] = useState("");
  let [days, Setdays] = useState(7);
  let [pt, Setpt] = useState("prices");
  const [chartData, SetchartData] = useState("");
  const [isLoading, SetisLoading] = useState(true);

  // making multiple useState varaibles :
  // coin1 and coin2 for setting coin ids for the two coins to be compared
  // coin1data and coin2data for coindata of both the coins
  // coin1prices and coin2prices for both the coin prices
  // days for number of days the data should be for
  // pt for pricetypes for differnet pricetypes
  // chartData for chartdata for each variation of days ,pricetype and coin
  // isLoading for loader visiblity
  
  let { currency } = useContext(global);
  useEffect(() => {
    (async () => {
      SetisLoading(true);
      let temp1 = await coinData(coin1);
      if (temp1) {
        coinObject(Setcoin1Data, temp1, currency);
        // essentially sets coin1data for the specific currency
      }
      let temp2 = await coinData(coin2);
      if (temp2) {
        coinObject(Setcoin2Data, temp2, currency);
        // essentially sets coin2data for the specific currency
      }
      // temp1 and temp2 are getting the coindata for coin1 and coin2 
      if (temp1 && temp2) {
        // if temp1 and temp2 exist
        let res1 = await coinPrice(coin1, days, currency);
        // getting coinprices for coin1 with coin1id , days and currency 
        if (res1) {
          Setcoin1prices(res1);
        }
        let res2 = await coinPrice(coin2, days, currency);
        // getting coinprices for coin2 with coin2id , with current days and current currency 
        if (res2) {
          Setcoin2prices(res2);
        }
        if (res1 && res2) {
          setchartDatafn(SetchartData, pt, res1, res2);
          SetisLoading(false);
          // if both res1 and res2 exist we set chartdata fn for chartjs and isLoading to false to stop laoding
        }
      }
    })();
    // iffe async function
  }, [currency]);
  // gets called whenever currency changes

  // triggers whenever coin1 gets chnaged form mui dropdown
  async function onChangecoin1(event) {
    SetisLoading(true);
    Setcoin1(event.target.value);
    // setting coin1 value for mui dropdwon for coin1
    let temp = await coinData(event.target.value);
    if (temp) {
      coinObject(Setcoin1Data, temp, currency);
      // essentially sets coin1data for the specific currency
    }
    let res = await coinPrice(event.target.value, days, currency);
    // fetch coinprice for updated coin1
    if (res) {
      Setcoin1prices(res);
      setchartDatafn(SetchartData, pt, res, coin2prices);
      SetisLoading(false);
      // Setting coin prices and setting chartdata for Chartjs and loader to false
    }
  }

  // triggers whenever coin2 gets chnaged form mui dropdown
  async function onChangecoin2(event) {
    SetisLoading(true);
    Setcoin2(event.target.value);
    // setting coin2 value for mui dropdwon for coin2
    let temp = await coinData(event.target.value);
    if (temp) {
      coinObject(Setcoin2Data, temp, currency);
      // essentially sets coin2data for the specific currency
    }
    let res = await coinPrice(event.target.value, days, currency);
    // fetch coinprice for updated coin2
    if (res) {
      Setcoin2prices(res);
      setchartDatafn(SetchartData, pt, coin1prices, res);
      SetisLoading(false);
      // Setting coin prices and setting chartdata for Chartjs and loader to false
    }
  }
  // gets trigerred whenever days is changed from mui dropdown 
  async function handleDayschange(event) {
    SetisLoading(true);
    Setdays(event.target.value);
    // setting days to new value

    // we don't need to fetch coindatas for both coins again because the coins are the same we just fetch coinprices for both coins for the updated number of days
    let res1 = await coinPrice(coin1, event.target.value, currency);
    if (res1) {
      Setcoin1prices(res1);
      // setting coin1prices
    }
    let res2 = await coinPrice(coin2, event.target.value, currency);
    if (res2) {
      Setcoin2prices(res2);
      // setting coin2prices
    }
    if (res1 && res2) {
      setchartDatafn(SetchartData, pt, res1, res2);
      SetisLoading(false);
      // making new chartdata for the updated values and setting loader to false
    }
  }

  // triggers whenever pricetpyes changes in the mui component
  const handlePriceTypeChange = (event, newType) => {
    if (newType) {
      Setpt(newType);
      // setting new price type
      console.log(newType);
      setchartDatafn(SetchartData, newType, coin1prices, coin2prices);
      // setting chart data again with updated price type and doesn't need any type of fetching of data
    }
  };
  return (
    <div>
      <Header></Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          <div className="coin-days-flex">
            {/* mui drop down for coin1 and coin2 */}
            <SelectCoins
              coin1={coin1}
              onChangecoin1={onChangecoin1}
              coin2={coin2}
              onChangecoin2={onChangecoin2}
            ></SelectCoins>
            {/* mui dropwdown for days selection */}
            <SelectDays
              days={days}
              Setdays={handleDayschange}
              noP={true}
            ></SelectDays>
          </div>
          {/* List view for both the coins */}
          {coin1Data && (
            <div className="wrapper" style={{ padding: "0rem 1rem" }}>
              <List coin={coin1Data}></List>
            </div>
          )}
          {coin2Data && (
            <div className="wrapper" style={{ padding: "0rem 1rem" }}>
              <List coin={coin2Data}></List>
            </div>
          )}
          <div className="wrapper">
            {/* price type chaning component */}
            {coin1prices && coin2prices && (
              <PriceType
                handlePriceTypeChange={handlePriceTypeChange}
                pt={pt}
                // passing hnadlePriceTpyeChange to call it on price type change
              ></PriceType>
            )}
            {/* Linechart component for multi axis as true for a multi axis line chart */}
            {chartData && coin1prices && coin2prices && (
              <LineChart
                chartData={chartData}
                priceType={pt}
                multiAxis={true}
              ></LineChart>
            )}
          </div>
          {/* coin heading and descriptions for both the coins */}
          {coin1Data && (
            <Coininfo heading={coin1Data.name} desc={coin1Data.desc}></Coininfo>
          )}
          {coin2Data && (
            <Coininfo heading={coin2Data.name} desc={coin2Data.desc}></Coininfo>
          )}
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default ComparePage;
