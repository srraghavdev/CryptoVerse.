import React from "react";
import "./styles.css";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { global } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { db } from "../../firebaseconfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginComponent({ logout }) {
  let navigate = useNavigate();
  let [email, Setemail] = useState("");
  let [pass, Setpass] = useState("");
  // useState varaibles for email and pass
  let { auth, user, Setuser, Setdocid } = useContext(global);
  function validatefn(e) {
    e.preventDefault();
    // to stop page reload on form submission

    // firebase method to signin user with email and password , takes auth object,email and pass
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        // reading and setting from Firestore as favs
        readandsetfavfromdb(userCredential.user.uid);
        // userCredential.user is the user object of signed in user
        Setuser(userCredential.user);
        // success toast
        toast.success(
          "Successfully Logged in, redirecting you to the Dashboard!"
        );
        // navigating to the dashboard after login
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        // extracting error code to basic error validations
        console.log(errorCode);
        // sending out error toasts for some fixed errors and one fallbakc error toast
        if (errorCode === "auth/wrong-password") {
          toast.error("Wrong password, please try again!");
        } else if (errorCode === "auth/user-not-found") {
          toast.error(
            "No user found with these credentials, please try again!"
          );
        } else {
          toast.error("Some error occurred , check logs for more information!");
        }
      });
  }

  async function readandsetfavfromdb(uid) {
    // getting collection reference , takes db ref and  collection name in firestore
    const colRef = collection(db, "favs");
    // getDocs will give all the documents in the collection
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      // iterating over all the documents , .data() extracts the saved data (provided by firebase)
      let temp = { ...doc.data() };
      if (temp.uid == uid) {
        // if temp unqiue id is the same as the unique id of the logged in user
        // setting docid of the document specific to the logged in user
        Setdocid(doc.id);
        // setting local storage as the saved favs from firestore
        localStorage.setItem("favs", temp.favs);
        return;
      }
    });
  }
  async function signout(e) {
    e.preventDefault();
    // to stop reload

    // signout fn takes auth reference and signs out logged in user
    signOut(auth)
      .then(() => {
        // signed out
        // setting user and docid as empty on successfull logoui
        Setuser("");
        Setdocid("");
        // setting favs in localstorage as emptyarray string
        localStorage.setItem("favs", "[]");
        toast.success(
          "Successfully signed out, redirecting you to the Dashboard!"
        );
          // success toast
          // timeout of 1s to naivgate to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        // error toast
        toast.error("Some error occurred in signing out!");
      });
  }

  return (
    <motion.form
    // onSubmit changes if this is logout or login
    // the same component is used for logout and login by a custom prop 
      onSubmit={logout ? signout : validatefn}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* h1 changes if it is for logout or login */}
      {logout ? (
        <h1 style={{ textAlign: "center", color: "var(--blue)" }}>Logout</h1>
      ) : (
        <h1 style={{ textAlign: "center", color: "var(--blue)" }}>Login</h1>
      )}
      {/* conditional rendering only when logout is false */}
      {!logout && <label>Email</label>}
      {/* conditional rendering only when logout is false */}
      {!logout && (
        <input
          type="email"
          onChange={(event) => Setemail(event.target.value)}
          required
        ></input>
      )}
      {/* conditional rendering only when logout is false */}
      {!logout && <label>Password</label>}
      {/* conditional rendering only when logout is false */}
      {!logout && (
        <input
          type="password"
          onChange={(event) => Setpass(event.target.value)}
          required
        ></input>
      )}
      <button>
        {/* conditional of Button text as Logout and Login */}
        <Button
          text={logout ? "Logout" : "Login"}
          outlined={false}
          onClick={() => console.log("1")}
        ></Button>
      </button>
      {/* conditional rendering only when logout is false */}
      {!logout && (
        <p className="dynamic">
          {/* to take user to signup page if they don't have an account */}
          Not a user? <Link to="/signup">Signup</Link>
        </p>
      )}
      <ToastContainer></ToastContainer>
    </motion.form>
  );
}

export default LoginComponent;
