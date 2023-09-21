export const checkfav = (id) => {
  const watchlist = localStorage.getItem("favs");
  // if watch list exists
  if (watchlist) {
    let arr = JSON.parse(watchlist);
    if (arr.includes(id)) {
      // if the coin does exist then return true
      return true;
    } else {
       // if the coin doesnt exist then return false
      return false;
    }
  }
  // return false if it doesnt exist
  return false;
};
