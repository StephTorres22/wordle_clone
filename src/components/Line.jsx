/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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

  const [word, setWord] = useState("");
  const [letterObjs, setLetterObjs] = useState([]);

  /* this isn't needed */
  useEffect(() => {
    const letters = [];
    for (let i = 0; i < count; i++) {
      letters.push(letterObjFactory(i));
    }
    setLetterObjs(letters);
  }, [count]);

  function checkWordHasLetter(letter, targetWord) {
    if (targetWord.includes(letter)) {
      return true;
    } else return false;
  }

  function rightLetterRightPosition(letter, targetLetter) {
    if (targetLetter === letter) {
      return true;
    } else return false;
  }

  function checkAllLetters(word, targetWord) {
    const updatedLetterObjsArray = [];
    for (let i = 0; i < word.length; i++) {
      const updatedTargetLetter = {
        ...letterObjs[i],
        correctLetter: checkWordHasLetter(word[i], targetWord),
        correctLetterCorrectPlace: rightLetterRightPosition(
          word[i],
          targetWord[i]
        ),
      };

      updatedLetterObjsArray.push(updatedTargetLetter);
    }
    setLetterObjs(() => updatedLetterObjsArray);
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
