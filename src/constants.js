export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
 
};

export const CODE_SNIPPETS = {
  javascript: `
// Write a function called areAllCharactersUnique that takes in a string 
// and returns true or false depending on whether all characters in the string are unique.
// Only javscript is supported.

function areAllCharactersUnique(str) {
  const charCount = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charCount[char]) {
      return false; // Return false if the character is already in the object
    }
    charCount[char] = true; // Mark character as seen
  }

  return true; // Return true if all characters are unique
}

console.log(areAllCharactersUnique("Istiak Ahammad")); // Test the function
`,
};

