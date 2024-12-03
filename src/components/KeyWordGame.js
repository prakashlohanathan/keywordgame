import React, { useState, useEffect } from "react";
import "./KeyWordGame.css";

const KeywordGame = () => {
  const [keyword, setKeyword] = useState("");
  const [targetBox, setTargetBox] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Game runs for 1 minute

  // Keywords list for random selection
  const keywords = ["HIT"];

  // Randomly select a box and keyword to display
  const showKeyword = () => {
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    const randomBox = Math.floor(Math.random() * 9); // 9 boxes, numbered 0-8

    setKeyword(randomKeyword);
    setTargetBox(randomBox);

    setTimeout(() => {
      setKeyword(""); // Remove keyword after 1 second
    }, 1000);
  };

  // Handle box click
  const handleClick = (boxIndex) => {
    if (gameOver) return; // Disable clicks after game is over

    if (boxIndex === targetBox) {
      setScore((prevScore) => prevScore + 5); // Correct click
    } else {
      setScore((prevScore) => prevScore - 2.5); // Wrong click
    }

    showKeyword(); // Show new keyword after each click
  };

  // Start timer
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft === 0) {
      setGameOver(true); // End game when time is up
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, gameOver]);

  // Start the game by showing the first keyword
  useEffect(() => {
    if (!gameOver) {
      showKeyword();
    }
  }, [gameOver]);

  return (
    <div className="game-container">
      <h1>Keyword Game</h1>
      <div className="timer">Time Left: {timeLeft}s</div>
      <div className="grid">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`box ${targetBox === index ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            {keyword && targetBox === index ? keyword : ""}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="score">
          <h2>Game Over</h2>
          <p>Your final score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default KeywordGame;
