import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Loader from "../components/common/Loader";
import { motion } from "framer-motion";
import BackToTop from "../components/common/BackToTop";
import Footer from "../components/common/Footer";
function News() {
  let [data, Setdata] = useState("");
  let [isLoading, SetisLoading] = useState(true);
  // data and isLoading are useState variabbles for stroing api result and loader value
  useEffect(() => {
    getNews();
  }, []);

  // getnews is an async function to fetch data from cryptocompare api
  async function getNews() {
    try {
      SetisLoading(true);
      let x = await axios.get(
        "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
      );
      console.log(x.data);
      Setdata(x.data.Data);
      SetisLoading(false);
      // setting data and loader to false
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header></Header>
      <BackToTop></BackToTop>
      {/* conditonal rendering when loading */}
      {isLoading && <Loader></Loader>}
      {!isLoading && (
        <div>
          <h1 style={{ textAlign: "center", color: "var(--blue)" }}>News</h1>
          <h2 style={{ textAlign: "center", color: "var(--white)" }}>
            Catch the latest news in the world of crypto
          </h2>
          <div className="news-container">
            {/* mapping over data for each news story */}
            {data &&
              data.map((element) => {
                return (
                  <motion.a
                    href={element.url}
                    className="indi-news"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="news-image">
                      <img
                        src={element.imageurl}
                        className="news-image-img"
                      ></img>
                    </div>
                    <div className="news-body">
                      <h3 className="news-title">{element.title}</h3>
                      <p className="news-body">{element.body}</p>
                    </div>
                  </motion.a>
                );
              })}
          </div>
        </div>
      )}
      {/* footer */}
      <Footer></Footer>
    </div>
  );
}

export default News;
