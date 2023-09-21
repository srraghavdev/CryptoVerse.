import React from "react";
import Header from "../components/common/Header";
import Tab from "../components/Dashboard/Tab";
import { useState, useEffect } from "react";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/common/Loader";
import BackToTop from "../components/common/BackToTop";
import getallcoins from "../functions/getallcoins";
import { useContext } from "react";
import { global } from "../context/globalContext";
import Footer from "../components/common/Footer";
function Dashboard() {
  let [coins, Setcoins] = useState([]);
  let [searchterm, Setsearchterm] = useState("");
  let [pagenumber, Setpagenumber] = useState(1);
  let [paginatedcoins, Setpaginatedcoins] = useState([]);
  let [isLoading, SetisLoading] = useState(true);
  // useState variables coins for all the coins fetched, searhcterm for the current search term, page number for current page number , paginated coins and isLoading for loader visiblity
  let { currency } = useContext(global);
  console.log(coins);
  useEffect(() => {
    getData();
  }, [currency]);
  // useeffect gets called whenever currency is changed from the Header
  async function getData() {
    let result = await getallcoins(currency);
    if (result) {
      let temp = JSON.parse(JSON.stringify(result));
      // deep coopying fetched data
      Setpaginatedcoins(temp.splice(0, 10));
      // setting first 10 elemmnts as paginated coins
      SetisLoading(false);
      // loading set to false
      Setcoins(result);
      // coins become all fetched coins
    } else {
      SetisLoading(false);
      // if result is empty set loader to false
    }
  }
  // filtering all coins based on the search term, this gets calculated on every rerender so we don't need to store it in a useState variable because on every time searhc term changes it will cause a re render and this will get calculated again. 
  var temparr = coins.filter(
    (element) =>
      element.name.toLowerCase().includes(searchterm.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchterm.toLowerCase())
  );

  // handleChnage whenever page number chnages from pagination component
  const handleChange = (event, value) => {
    // achieveing pagination by just slicing coin array to pass an array of 10 objects because we have a fixed size of 10 pages , so 10 per page becuase we are fetching only 100 coins
    Setpagenumber(value);
    let startingindex = (value - 1) * 10; // stating index calculation basic logic
    Setpaginatedcoins([...coins.slice(startingindex, startingindex + 10)]);
    // because slice is like subarray for 0 to 9 elements we have to call for 0 to 10
  };
  console.log(temparr);
  return (
    <div>
      <Header></Header>
      <BackToTop></BackToTop>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        // when isLoading is false
        <div>
          {/* passing search term and setsearch term to searhc component */}
          <Search set={Setsearchterm} searchterm={searchterm}></Search>
          <Tab
            // coins will be temparr(filtered coins) when search term is non empty and paginated coins when it is
            coins={searchterm ? temparr : paginatedcoins}
            set={Setsearchterm}
          ></Tab>
          {searchterm.length == 0 && (
            // when search term is empty 
            // pagination component gets passed pagenumber and handlechnage whenever a new page number is clicked
            <PaginationComponent
              page={pagenumber}
              handleChange={handleChange}
              length={coins.length}
            ></PaginationComponent>
          )}
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
