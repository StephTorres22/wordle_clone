import "./App.css";
import { getLetterOccurencesMap } from "./utility/checkWord.js";
import Line from "./components/Line";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

function App() {
  /* manually setting input refs, tried to do in a for loop but had a red squiggly */
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const fourthInput = useRef(null);
  const fifthInput = useRef(null);

  const inputRefs = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
  ];
  const [todaysWord, setTodaysWord] = useState("");
  useEffect(() => {
    async function getTodaysWord() {
      const word = await axios.get("http://localhost:8000/");

      /* 
    using standard fetch, think axios comes a lot more in handy when using other methods
     const data = await fetch("http://localhost:8000/", {
        method: "GET",
        mode: "cors",
      });

      const word = await data.json();
      setTodaysWord(word[0].word) */
      setTodaysWord(word.data[0].word.toUpperCase());
    }

    getTodaysWord();
    inputRefs[0].current.focus();
  });

  const letterOccurrencesMap = getLetterOccurencesMap(todaysWord);
  const wordLength = todaysWord.length;
  const attempts = [1, 2, 3, 4, 5];

  function changeInput(currentInput) {
    const currentInputRefIndex = inputRefs.indexOf(currentInput);

    if (currentInputRefIndex == inputRefs.length - 1) {
      return;
    }

    inputRefs[currentInputRefIndex + 1].current.focus();
  }

  return (
    <div
      style={{
        width: "50%",
        borderRadius: "5px",
        backgroundColor: "skyblue",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        left: "50%",
        translate: "-50%",
        paddingBottom: "1rem",
        fontFamily: "sans-serif"
      }}
    >
      {attempts.map((attempt, index) => {
        return (
          <Line
            handleInputChange={changeInput}
            inputRef={inputRefs[index]}
            attempt={attempt}
            count={wordLength}
            key={attempt}
            targetWord={todaysWord}
            lettersMap={letterOccurrencesMap}
          />
        );
      })}
    </div>
  );
}

export default App;
