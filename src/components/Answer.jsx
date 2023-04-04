import React, { useState, useEffect } from "react";

function Answer({ text, delay = 40 }) {
  const [output, setOutput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      const intervalId = setInterval(() => {
        setOutput((prevOutput) => prevOutput + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [currentIndex, delay, text]);

  return <span>{output}</span>;
}

export default Answer;
