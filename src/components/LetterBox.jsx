/* eslint-disable react/prop-types */
function LetterBox({
  children,
  correctLetter,
  correctLetterCorrectPlace,
  hasBeenUsed,
}) {
  const styles = {
    height: "6.5rem",
    width: "5rem",

    placeSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      correctLetterCorrectPlace && correctLetter
        ? "green"
        : correctLetter
        ? "yellow"
        : hasBeenUsed
        ? "darkGray"
        : "lightGray",
    borderRadius: "10px",
  };

  return (
    <div className="letterBox" style={styles}>
      {children}
    </div>
  );
}

export default LetterBox;
