/* eslint-disable react/prop-types */
import { useState } from "react";
import LetterBox from "./LetterBox";
import { checkWord } from "../utility/checkWord.js";

function Line({ count, targetWord }) {
  const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "1fr",
    height: "6rem",
    width: "50%",
    gap: "1rem",
    marginBottom: "1rem",
    backgroundColor: "blue",
    fontSize: "2.5rem",
    lineHeight: "1.5",
  };

  /* only want to do this on first load, this could be where the issue is! */
  function letterObjFactory(
    index,
    correctLetter = false,
    correctLetterCorrectPlace = false
  ) {
    return { index, correctLetter, correctLetterCorrectPlace };
  }
  const letters = [];

  const [word, setWord] = useState("");

  for (let i = 0; i < count; i++) {
    letters.push(letterObjFactory(i));
  }
  //under the forLoop as we muck around with letters
  const [letterObjs, setLetterObjs] = useState(letters);

  function checkLetter(letter, index, targetWord) {
    const targetArray = targetWord.split("");
    if (targetArray.includes(letter)) {
      if (targetWord[index] === letter) {
        let update = [
          ...letterObjs,
          (letterObjs[index].correctLetterCorrectPlace = true),
        ];
        setLetterObjs(update);
      } else {
        let update = [...letterObjs, (letterObjs[index].correctLetter = true)];
        setLetterObjs(update);
      }
    }
  }

  function checkAllLetters(word, targetWord) {
    for (let i = 0; i < targetWord.length; i++) {
      checkLetter(word[i], i, targetWord);
    }
  }
  return (
    <div>
      <input
        type="text"
        maxLength={5}
        value={word}
        onChange={(e) => {
          setWord(e.target.value.trim()); //.trim() removes the white space
        }}
      />
      <button
        onClick={() => {
          checkAllLetters(word, targetWord);
          checkWord(word, targetWord);
        }}
      >
        Check word
      </button>
      <div style={styles}>
        {letterObjs.map((letter) => {
          console.log(letterObjs);
          return (
            <LetterBox
              key={letter.index}
              correctLetter={letter.correctLetter}
              correctLetterCorrectPlace={letter.correctLetterCorrectPlace}
            >
              {word[letter.index]}
            </LetterBox>
          );
        })}
      </div>
    </div>
  );
}

export default Line;
