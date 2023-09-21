import { toast } from "react-toastify";
import { db } from "../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
export default function addFav(id, docid, uid, SetisAdded, isAdded) {
  // getting favs stored in the local storage
  let temp = JSON.parse(localStorage.getItem("favs"));
  // only add when id is not in the localstorage
  if (!temp.includes(id)) {
    temp.unshift(id);
    // adding to the temp array
    // setting the local storage
    localStorage.setItem("favs", JSON.stringify(temp));
    // gettign docref with db refrence , collection name and document id to be changed
    const docRef = doc(db, "favs", docid);
    // data object with updated favs array valyes
    const data = {
      favs: localStorage.getItem("favs"),
      uid: uid,
    };
    // using setDoc to update the document with docref
    setDoc(docRef, data)
      .then((docRef) => {
        console.log("added to db");
        // success toast with message as First char capitalized 
        toast.success(
          `${
            id.charAt(0).toUpperCase() + id.slice(1)
          } - Added To The Watchlist!`
        );
        // updating Setisadded
        SetisAdded(!isAdded);
      })
      .catch((error) => {
        console.log(error);
        // toast error
        toast.error("Couldn't add to the databse !");
      });
  }
}
