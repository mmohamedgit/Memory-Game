import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import classes from "./GameOver.module.css";
import PlayButton from "./PlayButton";

const GameOver = (props) => {
  //part 1 - timeout the same as the fade-in-out effect then part 2

  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [currentScore, setCurrentScore] = useState("");

  const { score, highScore, gameOver, onRestartGame } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayAgain(true);
    }, 4000);
    setCurrentScore(() => score);
    return () => {
      clearTimeout(timer);
    };
  }, [setShowPlayAgain, score]);

  const GameOverMessage = () => {
    return (
      <div className={classes.first}>
        <h2 className={classes.title}>GAME OVER!</h2>
        <div className={classes.image}>
          <img
            src={require(`../../assets/images/default/gameover.svg`).default}
            alt="game-over"
          ></img>
        </div>
      </div>
    );
  };

  let geniusLevel;
  let geniusLevelMessage;
  let imgFormat;

  switch (currentScore) {
    case 0:
      geniusLevel = "Patrick Star";
      geniusLevelMessage = "Are you even trying???";
      imgFormat = ".jpg";
      break;

    case 1:
    case 2:
      geniusLevel = "Average";
      geniusLevelMessage = "Not too shaby for a human.";
      imgFormat = ".gif";
      break;

    case 3:
    case 4:
      geniusLevel = "Stephen Hawking";
      geniusLevelMessage = "Your mind is as expansive as the Big Bang.";
      imgFormat = ".jpg";
      break;

    case 5:
    case 6:
      geniusLevel = "Galileo Galilei";
      geniusLevelMessage = "You set your eyes on the stars and galaxies.";
      imgFormat = ".jpg";
      break;

    case 7:
    case 8:
      geniusLevel = "Isaac Newton";
      geniusLevelMessage =
        "The genius apple doesn't fall far from the genius tree bro.";
      imgFormat = ".jpg";
      break;

    case 9:
    case 10:
      geniusLevel = "Garry Kasparov";
      geniusLevelMessage = "You predicted this move. Here's my queen, take it.";
      imgFormat = ".jpg";
      break;

    case 11:
    case 12:
      geniusLevel = "Nikola Tesla";
      geniusLevelMessage = "Are you even trying???";
      imgFormat = ".jpg";
      break;

    case 13:
    case 14:
      geniusLevel = "Albert Einstein";
      geniusLevelMessage = "Are you even trying???";
      imgFormat = ".jpg";
      break;

    case 15:
    case 16:
      geniusLevel = "Leonardo da Vinci";
      geniusLevelMessage = "";
      imgFormat = ".webp";
      break;

    default:
      geniusLevel = "Galaxy Brain";
      geniusLevelMessage = "Are you even trying???";
      imgFormat = ".webp";
      break;
  }

  const PlayAgain = () => {
    return (
      <div className={classes.second}>
        <div className={classes["score-title"]}>Highest Score</div>
        <div className={classes.score}>{highScore}</div>
        <div className={classes.genius}>
          <div>{geniusLevelMessage}</div>
          <img
            src={require(`../../assets/images/geniuses/${geniusLevel}${imgFormat}`)}
            alt="genius-img"
          ></img>
        </div>
        <div>
          <PlayButton
            gameOver={gameOver}
            onClick={onRestartGame}
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
