import "./App.css";

import Line from "./components/Line";

function App() {
  const todaysWord = "stair";
  const wordLength = todaysWord.length;
  const attempts = [1, 2, 3, 4, 5];
  return (
    <>
      {attempts.map((attempt) => {
        return (
          <Line count={wordLength} key={attempt} targetWord={todaysWord} />
        );
      })}
    </>
  );
}

export default App;
