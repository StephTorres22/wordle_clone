import "./App.css";
import { getLetterOccurencesMap } from "./utility/checkWord.js";
import Line from "./components/Line";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todaysWord, setTodaysWord] = useState("");
  useEffect(() => {
    async function getTodaysWord() {
      const word = await axios.get("http://localhost:8000/");
      console.log(word);
      setTodaysWord(word.data[0].word);
    }
    getTodaysWord();
  }, []);
  const letterOccurrencesMap = getLetterOccurencesMap(todaysWord);
  const wordLength = todaysWord.length;
  const attempts = [1, 2, 3, 4, 5];
  return (
    <>
      {attempts.map((attempt) => {
        return (
          <Line
            count={wordLength}
            key={attempt}
            targetWord={todaysWord}
            lettersMap={letterOccurrencesMap}
          />
        );
      })}
    </>
  );
}

export default App;
