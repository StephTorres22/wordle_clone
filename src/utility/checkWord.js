export function checkWord(word, targetWord) {
  if (word === targetWord) {
    console.log(true);
    return true;
  } else {
    console.log(false);
    return false;
  }
}

export function checkIndividualLetters(word, targetWord) {
  const correctLetters = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === targetWord[i]) {
      correctLetters.push(i);
    }
  }
}

export default checkWord;
