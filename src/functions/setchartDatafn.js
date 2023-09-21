import convertDate from "./convertDate";

export default function setchartDatafn(SetchartData, pt, prices1, prices2) {
  // Setting chartdata fn
  // when price2 exists aka multiaxis chart
  if (prices2) {
    SetchartData({
      // data for coin1 for each price type
      labels: prices1[pt].map((element) => convertDate(element[0])),
      datasets: [
        {
          label: "Coin 1",
          // data for coin1 for each price type
          data: prices1[pt].map((element) => element[1]),
          // various styles to make chart appealing
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "coin1",
        },
        {
          label: "Coin 2",
          // data for coin2 for each price type
          data: prices2[pt].map((element) => element[1]),
          // various styles to make chart appealing
          borderColor: "#61c96f",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          borderColor: "#61c96f",
          pointRadius: 0,
          yAxisID: "coin2",
        },
      ],
    });
  } else {
    // single coin chart 
    SetchartData({
      // labels or the x axis
      labels: prices1[pt].map((element) => convertDate(element[0])),
      datasets: [
        {
          label: "Coin",
          // data for coin for each price type
          data: prices1[pt].map((element) => element[1]),
          // various styles to make chart appealing
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: true,
          tension: 0.25,
          backgroundColor: "rgba(58, 128, 233,0.1)",
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "coin1",
        },
      ],
    });
  }
}
