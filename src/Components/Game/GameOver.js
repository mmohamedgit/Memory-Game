import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import classes from "./GameOver.module.css";
import PlayButton from "./PlayButton";

const GameOver = (props) => {
  //part 1 - timeout the same as the fade-in-out effect then part 2

  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const { score, highScore, gameOver, onRestartGame } = props;

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

  console.log(score);

  switch (score) {
    case 0:
      geniusLevel = "Patrick Star";
      geniusLevelMessage = "Are you even trying???";
      imgFormat = ".jpg";
      break;

    case 1:
    case 2:
      geniusLevel = "Novice";
      geniusLevelMessage = "You now know how to play this game!";
      imgFormat = ".webp";
      break;

    case 3:
    case 4:
      geniusLevel = "Unexpected Genius";
      geniusLevelMessage = "Just like that, you went beyond our expectations!";
      imgFormat = ".gif";
      break;

    case 5:
    case 6:
      geniusLevel = "Underrated Genius";
      geniusLevelMessage = "Low-key smart just like Christopher Langan.";
      imgFormat = ".jpg";
      break;

    case 7:
    case 8:
      geniusLevel = "Isaac Newton";
      geniusLevelMessage =
        "The genius apple doesn't fall far from the genius tree.";
      imgFormat = ".jpg";
      break;

    case 9:
    case 10:
      geniusLevel = "Garry Kasparov";
      geniusLevelMessage = "You predicted this win. Here's my queen, take it.";
      imgFormat = ".jpg";
      break;

    case 11:
    case 12:
      geniusLevel = "Nikola Tesla";
      geniusLevelMessage = "Here's a shocker: You are electrifying!";
      imgFormat = ".jpg";
      break;

    case 13:
    case 14:
      geniusLevel = "Albert Einstein";
      geniusLevelMessage = "Want to marry your cousin? It's all relative baby.";
      imgFormat = ".jpg";
      break;

    case 15:
    case 16:
      geniusLevel = "Leonardo da Vinci";
      geniusLevelMessage = "Fight with Michelangelo? It will end as a...draw.";
      imgFormat = ".webp";
      break;

    default:
      geniusLevel = "Galaxy Brain";
      geniusLevelMessage =
        "We officially declare your genius at galaxy-brain level.";
      imgFormat = ".webp";
      break;
  }

  const PlayAgain = () => {
    return (
      <div className={classes.second}>
        <div className={classes["score-title"]}>
          Highest Score: <span className={classes.score}>{highScore}pts</span>
        </div>
        <div className={classes.genius}>
          <div>
            Your Genius Level: <span>{geniusLevel}</span>
          </div>
          <img
            className={classes.img}
            src={require(`../../assets/images/geniuses/${geniusLevel}${imgFormat}`)}
            alt="genius-img"
          ></img>
          <div>{geniusLevelMessage}</div>
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
