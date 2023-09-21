import axios from "axios";

export default function getallcoins(currency) {
  let promise = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
  return promise;
}

// will get all coins for the current currnecy taken as an argument
// retutning a promise so to await this promise and get response.data returned by .then()