import { useEffect } from "react";
import NextLevelSound from "../../assets/sounds/next-level.mp3";
import classes from "./GameLevel.module.css";

const GameLevel = (props) => {
  const { gameOver, level } = props;

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
    <div className={classes.level}>
      {level.length === 0 ? (
        <h2>Get Ready...</h2>
      ) : (
        <h2>LEVEL {level.length}</h2>
      )}
    </div>
  );
};

export default GameLevel;
