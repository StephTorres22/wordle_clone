/* eslint-disable react/prop-types */
import LetterBox from "./LetterBox";

function Line({ count }) {
  const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "1fr",
    
    height: "5rem",
    width: "100%",
    backgroundColor: "blue",
  };
  const letters = [];

  for (let i = 0; i < count; i++) {
    letters.push(i);
  }
  return (
    <div style={styles}>
      {letters.map((letter) => {
        return <LetterBox key={letter}>{letter}</LetterBox>;
      })}
    </div>
  );
}

export default Line;
