import Modal from "../Modal/Modal";
import classes from "./GameOver.module.css";
import PlayButton from "./PlayButton";

const GameOver = (props) => {
  const GameOver = (
    <div className={classes.gameover}>
      <h2 className={classes.title}>Game Over!</h2>
      <div>
        <p className={classes["score-title"]}>Highest Score</p>
        <p className={classes.score}>{props.highestScore}</p>
      </div>
      <PlayButton
        gameOver={props.gameOver}
        onClick={props.onResetGame}
        title="Play Again"
      />
    </div>
  );

  return <Modal>{GameOver}</Modal>;
};

export default GameOver;
