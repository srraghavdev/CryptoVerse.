import React from "react";
import "./styles.css";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useEffect } from "react";

// When the user scrolls down 300px from the top of the document, show the button
function scrollFunction(mybutton) {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
    // documentElement for compatibility reasons
  ) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo(0, 0);
  // to scroll to the top of the page
}

function BackToTop() {
  // using useeffect and setTimeout to allow the myBtn div to render so as to not take in undefined, this was the only solution that worked(no duration is given so it executes the moment normal call stakc is empty)
  useEffect(() => {
    let timer = setTimeout(() => {
      var mybutton = document.getElementById("myBtn");
      window.onscroll = function () {
        scrollFunction(mybutton);
      };
    });

    return () => clearTimeout(timer);
  }, []);
  // clearing the timeout sort of like a pseudo debounce function to not cause a memory leak
  return (
    <div className="backtotop-btn" id="myBtn" onClick={() => topFunction()}>
      {/* onClick takes calls topFuntion */}
      <ArrowUpwardRoundedIcon
        style={{ color: "var(--blue" }}
      ></ArrowUpwardRoundedIcon>
    </div>
  );
}

export default BackToTop;
