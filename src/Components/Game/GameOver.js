import { useState, useEffect, Fragment } from "react";
import GameOptions from "./GameOptions";
import Modal from "../Modal/Modal";
import PlayButton from "./PlayButton";
import classes from "./GameOver.module.css";

const GameOver = (props) => {
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [showGameOptions, setShowGameOptions] = useState(false);

  const {
    gameOverImages,
    score,
    highScore,
    gameOver,
    onStartGame,
    onRestartGame,
  } = props;

  let gameOverImgFormat;

  const numberOfGameOverImages = gameOverImages.length;
  const randomNumber = Math.floor(Math.random() * +numberOfGameOverImages);
  const randomGameOverImage = gameOverImages[randomNumber];

  switch (randomGameOverImage) {
    case "elon-disappointed":
      gameOverImgFormat = "webp";
      break;
    case "elon-mad":
      gameOverImgFormat = "webp";
      break;
    case "elon-really":
      gameOverImgFormat = "webp";
      break;
    case "elon-what":
      gameOverImgFormat = "webp";
      break;
    case "protestor":
      gameOverImgFormat = "webp";
      break;
    case "dwight-pissed":
      gameOverImgFormat = "gif";
      break;
    case "scott-crying":
      gameOverImgFormat = "gif";
      break;

    case "scott-mad":
      gameOverImgFormat = "gif";
      break;

    case "scott-nooo":
      gameOverImgFormat = "gif";
      break;

    case "x-mark":
      gameOverImgFormat = "webp";
      break;

    default:
      break;
  }

  console.log(randomGameOverImage, gameOverImgFormat);
  const changeSettingsHandler = () => {
    setShowGameOptions(true);
  };

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
        <div>
          <h2 className={classes.title}>GAME OVER!</h2>
        </div>
        <div>
          <img
            className={classes[randomGameOverImage]}
            src={require(`../../assets/images/gameover/${randomGameOverImage}.${gameOverImgFormat}`)}
            alt="game-over"
          ></img>
        </div>
      </div>
    );
  };

  let geniusStyle;
  let geniusLevel;
  let geniusLevelMessage;
  let imgFormat;

  console.log(score);

  switch (score) {
    case 0:
      geniusLevel = "Patrick Star";
      geniusLevelMessage = "Are you even trying???";
      geniusStyle = "patrick";
      imgFormat = ".jpg";
      break;

    case 1:
    case 2:
      geniusLevel = "Novice";
      geniusLevelMessage = "You now know how to play this game!";
      geniusStyle = "novice";
      imgFormat = ".webp";
      break;

    case 3:
    case 4:
      geniusLevel = "Unexpected Genius";
      geniusLevelMessage = "Just like that, you went beyond our expectations!";
      geniusStyle = "unexpected";
      imgFormat = ".gif";
      break;

    case 5:
    case 6:
      geniusLevel = "Underrated Genius";
      geniusLevelMessage = "Low-key smart just like Christopher Langan.";
      geniusStyle = "underrated";
      imgFormat = ".jpg";
      break;

    case 7:
    case 8:
      geniusLevel = "Isaac Newton";
      geniusLevelMessage =
        "The genius apple doesn't fall far from the genius tree.";
      geniusStyle = "isaac";
      imgFormat = ".jpg";
      break;

    case 9:
    case 10:
      geniusLevel = "Garry Kasparov";
      geniusLevelMessage = "You predicted this win. Here's my queen, take it.";
      geniusStyle = "garry";
      imgFormat = ".jpg";
      break;

    case 11:
    case 12:
      geniusLevel = "Nikola Tesla";
      geniusLevelMessage = "Here's a shocker: You are electrifying!";
      geniusStyle = "nikola";
      imgFormat = ".jpg";
      break;

    case 13:
    case 14:
      geniusLevel = "Leonardo da Vinci";
      geniusLevelMessage = "Fight with Michelangelo? It will end as a...draw.";
      geniusStyle = "leonardo";
      imgFormat = ".webp";
      break;

    case 15:
    case 16:
      geniusLevel = "Albert Einstein";
      geniusLevelMessage = "Want to marry your cousin? It's all relative baby.";
      geniusStyle = "albert";
      imgFormat = ".jpg";
      break;

    default:
      geniusLevel = "Galaxy Brain";
      geniusLevelMessage =
        "Congrats, we officially declare your genius at galaxy-brain level. Highest level reached!";
      geniusStyle = "galaxy";
      imgFormat = ".webp";
      break;
  }

  const PlayAgain = () => {
    return (
      <div className={classes.second}>
        <div className={classes["score-title"]}>
          Highest Score: <span className={classes.score}>{highScore} PTS</span>
        </div>
        <div className={classes.genius}>
          <div className={classes["genius-level"]}>
            Genius Level: <span>{geniusLevel}</span>
          </div>
          <div className={classes["genius-style"]}>
            <img
              className={`${classes["genius-img"]} ${classes[geniusStyle]}`}
              src={require(`../../assets/images/geniuses/${geniusLevel}${imgFormat}`)}
              alt="genius-img"
            ></img>
          </div>

          <div className={`${classes.message} ${classes[geniusStyle]}`}>
            {geniusLevelMessage}
          </div>
        </div>
        <div className={classes.btn}>
          <PlayButton
            gameOver={gameOver}
            onClick={onRestartGame}
            buttonLabel="Restart"
          />
          <PlayButton buttonLabel="Settings" onClick={changeSettingsHandler} />
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {!showGameOptions && (
        <Modal>
          <div className={classes.gameover}>
            {!showPlayAgain && <GameOverMessage />}
            {showPlayAgain && <PlayAgain />}
          </div>
        </Modal>
      )}
      {showGameOptions && (
        <GameOptions onSelectedPattern={onStartGame} gameOver={gameOver} />
      )}
    </Fragment>
  );
};

export default GameOver;
