function formatQuantity(q: number) {
  if (q >= 1000) {
    const suffixes = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
    const exponent = Math.floor(Math.log10(q) / 3);
    const formatedNumber = (q / Math.pow(1000, exponent)).toFixed(1);
    return formatedNumber + suffixes[exponent];
  } else {
    return q.toString();
  }
}

export default formatQuantity
