export const convertNumbers = (number) => {
  if (number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1000000) {
      // for numbers between 1k and 1 million
      return (
        number.toString().slice(0, -3) +
        "." +
        number.toString().slice(-3, -1) +
        "K"
      );
    } else if (number >= 1000000 && number < 1000000000) {
      // for numbers between 1Million and 1 billion
      return (
        number.toString().slice(0, -6) +
        "." +
        number.toString().slice(-6, -4) +
        "M"
      );
    } else if (number >= 1000000000) {
      // Billion and above
      return (
        number.toString().slice(0, -9) +
        "." +
        number.toString().slice(-9, -7) +
        "B"
      );
    }
  }
};
// to convert big numbers into readable formarts like (1M , 1B , 1K etc.)