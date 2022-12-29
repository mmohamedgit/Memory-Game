import Modal from "../Modal/Modal";
import classes from "./GameOver.module.css";
import PlayButton from "./PlayButton";

const GameOver = (props) => {
  //part 1 - timeout the same as the fade-in-out effect then part 2
  const GameOver = (
    <div className={classes.gameover}>
      <div className={classes.first}>
        <h2 className={classes.title}>Game Over!</h2>
        <div className={classes.image}>
          <img
            src={require(`../../assets/images/the-office/gameover.png`)}
            alt="game-over"
          ></img>
        </div>
      </div>

      <div className={classes.second}>
        <div className={classes["score-title"]}>Highest Score</div>
        <div className={classes.score}>{props.highestScore}</div>
        <div>
          <PlayButton
            gameOver={props.gameOver}
            onClick={props.onResetGame}
            title="Play Again"
          />
        </div>
      </div>
    </div>
  );

  return <Modal>{GameOver}</Modal>;
};

export default GameOver;
