import React from "react";
import { global } from "./globalContext";
import { app } from "../firebaseconfig";
import { getAuth } from "firebase/auth";
import { useState } from "react";
let GlobalContextProvider = ({ children }) => {
  let [user, Setuser] = useState("");
  let [currency, Setcurrency] = useState("usd");
  let [render, Setrender] = useState("");
  let [docid, Setdocid] = useState("");
  // user useState for logged in user , currency for the current set currency, render to force re render, docid for the document id of the logged in user 
  // authobject 
  let authobject = {
    currency: currency,
    Setcurrency: Setcurrency,
    auth: getAuth(app),
    user: user,
    Setuser: Setuser,
    render: render,
    Setrender: Setrender,
    docid: docid,
    Setdocid: Setdocid,
  };

  return <global.Provider value={authobject}>{children}</global.Provider>;
};
export default GlobalContextProvider;
