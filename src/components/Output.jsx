const Output = ({ output, isError }) => {
  return (
    <div className="output-section">
      <h2>Output</h2>
      <div className={`output-display ${isError ? "error" : ""}`}>
        {output
          ? output.map((line, index) => <p key={index}>{line}</p>)
          : "No output to display."}
      </div>
    </div>
  );
};

export default Output;
