import NextLevelSound from "../../assets/sounds/next-level.mp3";
import { Fragment, useEffect } from "react";
import classes from "./Header.module.css";
const Header = (props) => {
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

  return (
    <div className={classes.header}>
      {!hideStartButton && <h1>Welcome to the Memory Game!</h1>}

      {level.length > 0 && !gameOver && (
        <Fragment>
          <h2>LEVEL {level.length}</h2>
          <h2>HIGH SCORE: {highScore}</h2>
        </Fragment>
      )}
    </div>
  );
};

export default Header;
