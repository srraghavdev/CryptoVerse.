import React from "react";
import "./styles.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Dont get rid of this
import { convertNumbers } from "../../../functions/convertNumbers";
import { useContext } from "react";
import { global } from "../../../context/globalContext";
import getcurrencysymbol from "../../../functions/getcurrencysymbol";
function LineChart({ chartData, priceType, multiAxis }) {
  let options = {};
  // making options empty object
  let { currency } = useContext(global);
  // getting currency to be added to each tick 
  if (multiAxis) {
    // when multiaxis is true
    options = {
      plugins: {
        legend: {
          display: multiAxis ? true : false,
          // setting legend display  to true when multiaxis 
        },
      },
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        coin1: {
          type: "linear",
          display: true,
          position: "left",
          // positon left for coin1
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              // this callback is called for the value each tick
              if (priceType === "prices") {
                return (
                  getcurrencysymbol(currency) + " " + (value.toLocaleString() ? value.toLocaleString() : 0)
                  // making sure if converted valyue is not undefined if yes we use 0
                  // getting currency symbol for each currency id and converting to locale string(adding ,)
                );
              } else {
                return (
                  getcurrencysymbol(currency) + " " + (convertNumbers(value) ? convertNumbers(value) : 0)
                  // making sure if converted valyue is not undefined if yes we use 0
                   // getting currency symbol for each currency id and converting value since it will be a big number to (Million , Thousand , Billion)
                );
              }
            },
          },
        },
        coin2: {
          type: "linear",
          display: true,
          position: "right",
          // positon right for coin2
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              if (priceType === "prices") {
                return (
                  getcurrencysymbol(currency) + " " + (value.toLocaleString() ? value.toLocaleString() : 0)
                  // making sure if converted valyue is not undefined if yes we use 0
                   // getting currency symbol for each currency id and converting to locale string(adding ,)
                );
              } else {
                return (
                  getcurrencysymbol(currency) + " " + (convertNumbers(value) ? convertNumbers(value) : 0)
                  // making sure if converted valyue is not undefined if yes we use 0
                   // getting currency symbol for each currency id and converting value since it will be a big number to (Million , Thousand , Billion)
                );
              }
            },
          },
        },
      },
    };
  } else {
    options = {
      plugins: {
        legend: {
          display: multiAxis ? true : false,
          // display will be false when one coin chart
        },
      },
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        coin1: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              if (priceType === "prices") {
                return (
                  getcurrencysymbol(currency) + " " + (value.toLocaleString() ? value.toLocaleString() : 0) 
                  // making sure if converted valyue is not undefined if yes we use 0
                  // getting currency symbol for each currency id and converting to locale string(adding ,)
                );
              } else {
                return (
                  getcurrencysymbol(currency) + " " + (convertNumbers(value) ? convertNumbers(value) : 0)
                  // making sure if converted valyue is not undefined if yes we use 0
                  // getting currency symbol for each currency id and converting value since it will be a big number to (Million , Thousand , Billion)
                );
              }
            },
          },
        },
      },
    };
  }

  return <Line data={chartData} options={options} />;
}
export default LineChart;
