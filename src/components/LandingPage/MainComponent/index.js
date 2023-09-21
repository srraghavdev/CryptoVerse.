import React from "react";
import "./styles.css";
import Button from "../../common/Button";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
let MainComponent = () => {
  return (
    <div className="flex-info">
      <div className="left-component">
        {/* static h1 tags with static text with basic framer-motion animations  */}
        <motion.h1
          className="crypto-heading"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          className="realtime-heading"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className="text-info"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Track crypto through a public api in real time,add coins to favourites
          which are saved to the cloud,checkup on the latest news and access the
          most comprehensive glossary to clear any doubts.
        </motion.p>
        <motion.div
          className="btn-flex"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {/* wrapped in a Link component so onClick it redirects to the given address */}
          <Link to="/dashboard">
            <Button
              text={"dashboard"}
              onClick={() => console.log("clicked dash")}
            ></Button>
          </Link>
          {/* Using Rwebshare package we can make a multi platform share button with text,url and title mentioned below paased as props */}
          <RWebShare
            data={{
              text: "CryptoVerse made using React JS, React-Router and Firebase.",
              url: "",
              title: "CryptoVerse.",
            }}
            onClick={() => console.log("shared successfully!")}
            // onClick for the buttom
          >
            <Button
              text={"share"}
              onClick={() => console.log("clicked share")}
              outlined={true}
            ></Button>
            {/* This button on Click will trigger the RWebshare */}
          </RWebShare>
        </motion.div>
      </div>
      {/* iphone image container with styles applied for framer-motion */}
      <div className="right-container">
        <motion.img
          src={iphone}
          className="iphone"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            // differrent properties for the animation type etc.
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        ></motion.img>
        <img src={gradient} className="gradient"></img>
      </div>
    </div>
  );
};

export default MainComponent;
