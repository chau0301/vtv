function shuffleString(inputString: string): string {
  if (inputString.length <= 1) {
    return inputString;
  }

  // Convert the string to an array of characters
  let characters = inputString.replaceAll(" ", "").split("");

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Check for undefined values and swap only if both values are strings
    if (characters[i] !== undefined && characters[j] !== undefined) {
      const temp = characters[i];
      characters[i] = characters[j] || '';
      characters[j] = temp || '';
    }
  }

  // Filter out undefined values and join the shuffled characters with '/'
  return characters.filter((c): c is string => c !== undefined).join("/");
}

  
  export { shuffleString };
  