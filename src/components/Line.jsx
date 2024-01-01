/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LetterBox from "./LetterBox";
import {
  checkWord,
  letterObjFactory,
  checkWordHasLetter,
  rightLetterRightPosition,
  getLetterCountFromInputWord,
} from "../utility/checkWord.js";

function Line({ count, targetWord, lettersMap }) {
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


  const [word, setWord] = useState("");
  const [letterObjs, setLetterObjs] = useState([]);
  const [disabled, setDisabled] = useState(false);
  
  /* this isn't needed */
  useEffect(() => {
    const letters = [];
    for (let i = 0; i < count; i++) {
      letters.push(letterObjFactory(i, word[i]));
    }
    setLetterObjs(letters);
  }, [word, count]); //

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

    setLetterObjs(() => compareCounts(updatedLetterObjsArray));
    
  }

  function compareCounts(array) {
    const inputLetterOccurrences = getLetterCountFromInputWord(word);
    const map = lettersMap;

    const updatedArray = [...array];

    for (const letter in inputLetterOccurrences) {
      if (map.has(letter)) {
        const count = map.get(letter);
        if (inputLetterOccurrences[letter] > count) {
          const numberOfChanges = inputLetterOccurrences[letter] - count;
          const letterObjsToEdit = array.filter(
            (letterObj) =>
              letterObj.letter == letter &&
              letterObj.correctLetterCorrectPlace !== true
          );

          /* work backwards through letterObjsToEdit array */
          for (let i = numberOfChanges - 1; i >= 0; i--) {
            const updatedObj = { ...letterObjsToEdit[i], correctLetter: false };
            updatedArray[updatedObj.index] = updatedObj;
          }
        }
      }
    }

    return updatedArray;
  }

  return (
    <div>
      <input
        type="text"
        maxLength={targetWord.length}
        value={word}
        onChange={(e) => {
          setWord(e.target.value.trim()); //.trim() removes the white space
        }}
        disabled={disabled}
      />
      <button
        onClick={() => {
          if (word.length < targetWord.length) {
            alert("Your word is too short");
          } else {
            checkAllLetters(word, targetWord);
            checkWord(word, targetWord, letterObjs);
            setDisabled(!disabled);
          }
          /* need to add functionality not to be able to check words that are too short. */
        }}
        disabled={disabled}
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
              {letter.letter}
            </LetterBox>
          );
        })}
      </div>
    </div>
  );
}

export default Line;
