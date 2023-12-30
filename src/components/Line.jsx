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
  const letters = [];

  const [word, setWord] = useState("");

  for (let i = 0; i < count; i++) {
    letters.push(i);
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
      <button onClick={() => checkWord(word, targetWord)}>Check word</button>
      <div style={styles}>
        {letters.map((letter) => {
          return <LetterBox key={letter}>{word[letter]}</LetterBox>;
        })}
      </div>
    </div>
  );
}

export default Line;
