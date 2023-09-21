import axios from "axios";

export default function coinPrice(id, days, currency) {
  let promise = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    )
    .then((response) => response.data)
    .catch((error) => alert(error.message));
  return promise;
}

// will get coinPrice of a specific coin with id for certain number of days and for the current currency
// retutning a promise so to await this promise and get response.data returned by .then()
