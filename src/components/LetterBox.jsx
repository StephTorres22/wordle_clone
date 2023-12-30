/* eslint-disable react/prop-types */
function LetterBox({ children }) {
  const styles = {
    height: "5rem",
    width: "5rem",
    backgroundColor: "red",
    placeSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="letterBox" style={styles}>
      {children}
    </div>
  );
}

export default LetterBox;
