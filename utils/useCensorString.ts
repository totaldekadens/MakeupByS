const useCensorString = (string: string) => {
  //let getLength = string.length;
  //let numberOfCharacters = getLength / 4;
  var censored =
    string.slice(0, 2) + "*".repeat(string.length - 2) + string.slice(-2);
  return censored;
};

export default useCensorString;
