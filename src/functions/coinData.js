import axios from "axios";
export default function coinData(id) {
  let promise = axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response) => response.data)
    .catch((error) => alert(error));
  return promise;
}

// will get coindata of a specific coin with id as the id of the coin 
// retutning a promise so to await this promise and get response.data returned by .then()
