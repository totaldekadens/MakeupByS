/**
 * Helper function to handle casing of strings for login and signup checks
 * @param inputValue
 * @returns caseInsensitive regex string
 */
const caseInsensitive = (inputValue: string) => {
  return new RegExp(`^${inputValue}$`, "i");
};

export default caseInsensitive;
