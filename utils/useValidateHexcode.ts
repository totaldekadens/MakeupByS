const useValidateHexcode = (hexcode: string) => {
  if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hexcode)) {
    return true;
  }
  return false;
};

export default useValidateHexcode;
