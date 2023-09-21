import React from "react";
import Header from "../components/common/Header";
import Search from "../components/Dashboard/Search";
import { useState } from "react";
import { glossarydata } from "../glossarydata";
import Button from "../components/common/Button";
import { motion } from "framer-motion";
import BackToTop from "../components/common/BackToTop";
import Footer from "../components/common/Footer";
function Glossary() {
  let keys = Object.keys(glossarydata);
  // since glossray data is an object Object.keys would extract all the keys in an array to be mapped in JSX
  let [search, Setsearch] = useState("");
  // search term useState variable
  return (
    <div>
      {/* Header,Backtotop btn */}
      <Header></Header>
      <BackToTop></BackToTop>
      <h1 style={{ textAlign: "center", color: "var(--blue)" }}>Glossary</h1>
      <h2
        style={{ textAlign: "center", color: "var(--white)" }}
        className="glossary-desc"
      >
        Browse the most complete definitions for all major terminologies of the
        blockchain and cryptocurrency world.
      </h2>
      {/* search component  */}
      <Search set={Setsearch} searchterm={search}></Search>
      <div className="terms-container">
        {search ? (
          keys.filter((element) =>
            element.toUpperCase().includes(search.toUpperCase())
          ).length == 0 ? (
            // when searh term length is non zero and filtered array has 0 elements show message for no results 
            <div className="no-result">
              <p className="no-resultp">No matching terms</p>
              <Button
                text={"Clear Search"}
                onClick={() => Setsearch("")}
              ></Button>
            </div>
          ) : (
            // when searh term length is non zero and filtered array has more than 0 elements, show the definition card
            keys
              .filter((element) =>
                element.toUpperCase().includes(search.toUpperCase())
              )
              .map((e) => {
                return (
                  <motion.div
                    className="glossary-term"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="heading">{e}</h2>
                    <p className="definition">{glossarydata[e]}</p>
                  </motion.div>
                );
              })
          )
        ) : (
          // when searh term length is zero, show the entire object data
          keys.map((element) => {
            return (
              <motion.div
                className="glossary-term"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="heading">{element}</h2>
                <p className="definition">{glossarydata[element]}</p>
              </motion.div>
            );
          })
        )}
      </div>
      <Footer></Footer>
      {/* footer */}
    </div>
  );
}

export default Glossary;
