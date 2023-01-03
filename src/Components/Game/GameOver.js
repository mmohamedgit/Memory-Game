import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import classes from "./GameOver.module.css";
import PlayButton from "./PlayButton";

const GameOver = (props) => {
  //part 1 - timeout the same as the fade-in-out effect then part 2

  const [showPlayAgain, setShowPlayAgain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayAgain(true);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [setShowPlayAgain]);

  const GameOverMessage = () => {
    return (
      <div className={classes.first}>
        <h2 className={classes.title}>Game Over!</h2>
        <div className={classes.image}>
          <img
            src={require(`../../assets/images/default/gameover.svg`).default}
            alt="game-over"
          ></img>
        </div>
      </div>
    );
  };

  const PlayAgain = () => {
    return (
      <div className={classes.second}>
        <div className={classes["score-title"]}>Highest Score</div>
        <div className={classes.score}>{props.highScore}</div>
        <div>
          <PlayButton
            gameOver={props.gameOver}
            onClick={props.onRestartGame}
            title="Play Again"
          />
        </div>
      </div>
    );
  };

  return (
    <Modal>
      <div className={classes.gameover}>
        {!showPlayAgain && <GameOverMessage />}
        {showPlayAgain && <PlayAgain />}
      </div>
    </Modal>
  );
};

export default GameOver;
