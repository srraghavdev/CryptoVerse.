

export default function convertDate(number) {
  let p = new Date(number);
  return p.getDate() + "/" + (p.getMonth() + 1);
}
// making date into day/month format from the epoch time as argument
