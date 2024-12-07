import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const TextForm = () => {
  const [text, setText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    return storedMode === "true";
  });

  const handleUpClick = () => {
    setText(text.toUpperCase());
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
  };

  const handleClearClick = () => {
    setText("");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const removeExtraSpaces = () => {
    setText(text.replace(/\s+/g, " "));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        title: "Copied!",
        text: "Text copied to clipboard!",
        icon: "success",
        confirmButtonText: "OK",
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  // Calculate words and minutes per read
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const minutesPerRead = (0.008 * wordCount).toFixed(3);

  return (
    <div
      className={`d-flex flex-column ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Header Section */}
      <header className="text-center py-4 position-relative">
        <h1 className="mb-3 my-5 underline">TextiQ</h1>
        <p className="font-monospace">
          Analyze your text, just type or paste it below!
        </p>
        <button
          className="btn btn-secondary position-absolute top-0 end-0 m-3"
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div className="w-75 position-relative">
          <div className="d-flex justify-content-end mb-2">
            <i
              className="fas fa-arrow-up mx-1"
              onClick={handleUpClick}
              style={{ cursor: "pointer" }}
              title="Uppercase"
            ></i>
            <i
              className="fas fa-arrow-down mx-1"
              onClick={handleLoClick}
              style={{ cursor: "pointer" }}
              title="Lowercase"
            ></i>
            <i
              className="fas fa-trash mx-1"
              onClick={handleClearClick}
              style={{ cursor: "pointer" }}
              title="Clear"
            ></i>
            <i
              className="fas fa-copy mx-1"
              onClick={handleCopy}
              style={{ cursor: "pointer" }}
              title="Copy"
            ></i>
            <i
              className="fas fa-eraser mx-1"
              onClick={removeExtraSpaces}
              style={{ cursor: "pointer" }}
              title="Trim"
            ></i>
          </div>
          <textarea
            className="form-control card font-monospace"
            value={text}
            onChange={handleOnChange}
            placeholder="Input here..."
            rows={8}
          ></textarea>
        </div>
      </main>

      {/* Summary Section */}
      <footer className="text-center py-4">
        <div className="container">
          <h2 className="underline">Summary</h2>
          <p className="font-monospace">
            {wordCount} Words and {text.length} Characters, {minutesPerRead}{" "}
            minutes per read
          </p>
          <div className="card">
            <div className="card-body">
              <h2 className="underline">Preview</h2>
              <p className="font-monospace text-justify">{text}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TextForm;
