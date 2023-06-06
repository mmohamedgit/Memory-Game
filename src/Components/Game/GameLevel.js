import { useEffect } from "react";
import { useSelector } from "react-redux";

import NextLevelSound from "../../assets/sounds/next-level.mp3";
import classes from "./GameLevel.module.css";

const GameLevel = (props) => {
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const gamePattern = useSelector((state) => state.game.gamePattern);

  const level = gamePattern.length;

  const playSound = (name) => {
    //maybe move this to gameSlice + delay 100 after tileclick sound (they sound together almost at the same time)
    var audio = new Audio(name);
    audio.play();
  };

  useEffect(() => {
    if (level > 1 && !isGameOver) {
      playSound(NextLevelSound);
    }
  }, [level, isGameOver]);

  return (
    <div className={classes.level}>
      {level === 0 ? <h2>Get Ready...</h2> : <h2>LEVEL {level}</h2>}
    </div>
  );
};

export default GameLevel;
