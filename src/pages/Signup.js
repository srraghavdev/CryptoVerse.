import React from "react";
import SignupComponent from "../components/SignupComponent";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function Signup() {
  return (
    // header,signup component and footer
    <div className="signupcont">
      <Header></Header>
      <div className="signuppage">
        <SignupComponent></SignupComponent>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Signup;
