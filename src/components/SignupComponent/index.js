import React from "react";
import "./styles.css";
import { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useContext } from "react";
import { global } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignupComponent() {
  let navigate = useNavigate();
  let [email, Setemail] = useState("");
  let [pass, Setpass] = useState("");
  let [confirmpass, Setconfirmpass] = useState("");
  // use State variables for form inputs
  let { auth, user, Setuser, Setdocid } = useContext(global);
  console.log(user);
  function validatefn(e) {
    e.preventDefault();
     // to stop page reload on form submission

    //  validation for pass and confirmpass being same
    if (confirmpass !== pass) {
      toast.error("Passwords do not match!");
      return;
    }
    // validation for password length
    if (pass.trim().length < 6) {
      toast.error("Password should be at least 6 characters!");
      return;
    }
    // firebase method to create user with email and password , takes auth object,email and pass
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        checkdata();
         // setting localstorage favs to empty array string
        localStorage.setItem("favs", "[]");
        // userCredential.user is the user object of signed in user
        Setuser(userCredential.user);
         // success toast
        toast.success(
          "Successfully Signed up, redirecting you to the Dashboard!"
        );
        // navigating to the dashboard after Signup
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((error) => {
         // extracting error code to basic error validations
        const errorCode = error.code;
        // sending out error toasts for some fixed errors and one fallbakc error toast
        if (errorCode === "auth/email-already-in-use") {
          toast.error("Email already exists , please use another email!");
        }
        else{
          toast.error('Some error occurred in signing you up!')
        }
      });
  }
  async function checkdata() {
    // extracting uid of the current logged in user
    let { uid } = auth.currentUser;
    // to read the data from the collection for each user
    const collectionRef = collection(db, "favs");
    // getting collection refrence 
    let data = {
      favs: "[]",
      uid: uid,
    };
    // adding document to the collection with data as data object
    addDoc(collectionRef, data)
      .then((docRef) => {
        console.log("Document has been added successfully");
        Setdocid(docRef.id);
        // Setting docid as docRef.id
      })
      .catch((error) => {
        // error toast
        toast.error("Coudln't make entry into db!");
      });
  }
  return (
    <motion.form
    // form with onSubmit as validate fn
      onSubmit={validatefn}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* various input fields with onChnage for their respective useState variables */}
      <h1 style={{ textAlign: "center", color: "var(--blue)" }}>Signup</h1>
      <label>Email</label>
      <input
        type="email"
        onChange={(event) => Setemail(event.target.value)}
        required
      ></input>
      <label>Password</label>
      <input
        type="password"
        onChange={(event) => Setpass(event.target.value)}
        required
      ></input>
      <label>Confirm Password</label>
      <input
        type="password"
        onChange={(event) => Setconfirmpass(event.target.value)}
        required
        id="confrim"
      ></input>
      {/* wrapping Button inside a button tag to act as button for the form */}
      <button>
        <Button
          text={"Signup"}
          outlined={false}
          onClick={() => console.log("1")}
        ></Button>
      </button>
      <p className="dynamic">
        {/* for users that already have an account show this */}
        Already a user? <Link to="/login">Login</Link>
      </p>
      <ToastContainer></ToastContainer>
    </motion.form>
  );
}

export default SignupComponent;
