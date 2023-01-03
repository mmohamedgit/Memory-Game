import NextLevelSound from "../../assets/sounds/next-level.mp3";
import { useState, useEffect } from "react";
import classes from "./Header.module.css";
const Header = (props) => {
  const [playedPreviousGame, setPlayedPreviousGame] = useState(false);
  const { gameOver, hideStartButton, level, highScore } = props;

  const playSound = (name) => {
    var audio = new Audio(name);
    audio.play();
  };

  useEffect(() => {
    if (level.length > 1 && !gameOver) {
      playSound(NextLevelSound);
    }
  }, [level, gameOver]);

  if (!playedPreviousGame && gameOver) {
    setPlayedPreviousGame(true);
  }

  return (
    <div className={classes.header}>
      {!hideStartButton && <h1>Welcome to the Memory Game!</h1>}

      {level.length > 0 && !gameOver && <h2>LEVEL {level.length}</h2>}

      {playedPreviousGame && !gameOver && <h2>HIGH SCORE: {highScore}</h2>}
    </div>
  );
};

export default Header;
