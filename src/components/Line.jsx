/* eslint-disable react/prop-types */
import LetterBox from "./LetterBox";

function Line({ count }) {
  const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "1fr",
    height: "6rem",
    width: "50%",
    gap: "1rem",
    marginBottom: "1rem",
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
