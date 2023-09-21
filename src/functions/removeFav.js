import { toast } from "react-toastify";
import { db } from "../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
export default function removeFav(id, docid, uid, SetisAdded, isAdded) {
  // only remove currency if user cliks on okay on the confirm alert
  if (window.confirm("Are you sure you want to remove this coin?")) {
    // getting favs stored in the local storage
    let temp = JSON.parse(localStorage.getItem("favs"));
    // setting new favs in the local storage with filtered array to exclude the id of the coin to be removed
    localStorage.setItem(
      "favs",
      JSON.stringify(temp.filter((item) => item != id))
    );
    // document refernece with db reference , collection name and document id to be modified
    const docRef = doc(db, "favs", docid);
    // new data to be added
    const data = {
      favs: localStorage.getItem("favs"),
      uid: uid,
    };
    setDoc(docRef, data)
      .then((docRef) => {
        // successfully changed document
        console.log("added to db");
        // success toast with first letter capitalized 
        toast.success(
          `${
            id.charAt(0).toUpperCase() + id.slice(1)
          } - removed from the watchlist!`
        );
        SetisAdded(!isAdded);
        // set Setisadded 
      })
      .catch((error) => {
        console.log(error);
        // toast error
        toast.error("Couldn't remove from the databse !");
      });
  }
}
