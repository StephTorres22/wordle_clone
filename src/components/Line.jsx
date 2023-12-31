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

  //under the forLoop as we muck around with letters

  function checkLetter(letter, index, targetWord) {
    const targetArray = targetWord.split("");
    if (targetArray.includes(letter)) {
      if (targetWord[index] === letter) {
        const targetLetter = letterObjs[index];
        const updatedTargetLetter = {
          ...targetLetter,
          correctLetterCorrectPlace: true,
        };
        /* wasn't working with just the toSpliced method, 
        const updated = letterObjs.toSplice(index, 1, updatedTargetLetter) thought that was how it should be.
        and const updated = [...letterObjs, letterObjs[index] = updatedTargetLetter] creates a duplication.
        so... tried this and it seems to work.  */
        const updatedList = [
          ...letterObjs.toSpliced(index, 1),
          (letterObjs[index] = updatedTargetLetter),
        ];
        /* needed as an anonymous arrow func so that the state update happens straight away, we're in a for loop when being called */
        setLetterObjs(() => updatedList);
      } else {
        const targetLetter = letterObjs[index];
        const updatedTargetLetter = { ...targetLetter, correctLetter: true };
        const update = [
          ...letterObjs.toSpliced(index, 1, updatedTargetLetter),
          (letterObjs[index] = updatedTargetLetter),
        ];

        setLetterObjs(() => update);
      }
    }
    console.log(letterObjs);
  }

  function checkAllLetters(word, targetWord) {
    for (let i = 0; i < word.length; i++) {
      checkLetter(word[i], i, targetWord);
    }
    console.log(letterObjs);
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
