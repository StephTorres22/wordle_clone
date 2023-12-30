import "./App.css";

import Line from "./components/Line";

function App() {
  const attempts = [1, 2, 3, 4, 5];
  return (
    <>
      {attempts.map((attempt) => {
        return <Line count={5} key={attempt} />;
      })}
    </>
  );
}

export default App;
