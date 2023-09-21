import React from "react";
import LoginComponent from "../components/LoginComponent";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function Login() {
  return (
    <div className="signupcont">
      {/* header , login(the same component works for both logout and login) and footer */}
      <Header></Header>
      <div className="signuppage">
        <LoginComponent logout={false}></LoginComponent>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
