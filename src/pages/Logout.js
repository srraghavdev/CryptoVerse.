import React from "react";
import LoginComponent from "../components/LoginComponent";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function Logout() {
  return (
    <div className="signupcont logout">
      {/* header , login(the same component works for both logout and login) and footer */}
      <Header></Header>
      <div className="signuppage">
        <LoginComponent logout={true}></LoginComponent>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Logout;
