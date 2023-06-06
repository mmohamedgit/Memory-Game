import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { settingsActions } from "../../store/settings-slice";

import Modal from "../Modal/Modal";
import PlayButton from "./PlayButton";
import classes from "./GameOver.module.css";
import Settings from "./Settings";
import { gameActions } from "../../store/game-slice";

const GameOver = () => {
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const dispatch = useDispatch();

  const gameOverImages = useSelector((state) => state.game.gameOverImages);
  const score = useSelector((state) => state.game.currentScore);
  const highestScore = useSelector((state) => state.game.highestScore);

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

  const changeSettingsHandler = () => {
    dispatch(settingsActions.hideSettings(false));
    dispatch(gameActions.resetPattern());
  };

  const restartGameHandler = () => {
    dispatch(gameActions.resetPattern());
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

  switch (score) {
    case 0:
      geniusLevel = (
        <a
          href="https://spongebob.fandom.com/wiki/Patrick_Star#Intelligence"
          rel="noreferrer"
          target="_blank"
        >
          Patrick Star
        </a>
      );
      geniusLevelMessage = "Are you even trying???";
      geniusStyle = "patrick";
      imgFormat = ".jpg";
      break;

    case 1:
    case 2:
      geniusLevel = (
        <a
          href="https://knowyourmeme.com/memes/roll-safe"
          rel="noreferrer"
          target="_blank"
        >
          Novice
        </a>
      );
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
      geniusLevel = (
        <a
          href="https://en.wikipedia.org/wiki/Christopher_Langan"
          rel="noreferrer"
          target="_blank"
        >
          Christopher Langan
        </a>
      );
      geniusLevelMessage = "Low-key smart just like Christopher Langan.";
      geniusStyle = "christopher";
      imgFormat = ".jpg";
      break;

    case 7:
    case 8:
      geniusLevel = (
        <a
          href="https://www.biography.com/scientists/isaac-newton"
          rel="noreferrer"
          target="_blank"
        >
          Isaac Newton
        </a>
      );
      geniusLevelMessage =
        "The genius apple doesn't fall far from the genius tree.";
      geniusStyle = "isaac";
      imgFormat = ".jpg";
      break;

    case 9:
    case 10:
      geniusLevel = (
        <a
          href="https://www.chess.com/players/garry-kasparov"
          rel="noreferrer"
          target="_blank"
        >
          Garry Kasparov
        </a>
      );
      geniusLevelMessage = "You predicted this win. Here's my queen, take it.";
      geniusStyle = "garry";
      imgFormat = ".jpg";
      break;

    case 11:
    case 12:
      geniusLevel = (
        <a
          href="https://www.biography.com/inventors/nikola-tesla"
          rel="noreferrer"
          target="_blank"
        >
          Nikola Tesla
        </a>
      );
      geniusLevelMessage = "Here's a shocker: You are electrifying!";
      geniusStyle = "nikola";
      imgFormat = ".jpg";
      break;

    case 13:
    case 14:
      geniusLevel = (
        <a
          href="https://www.biography.com/artists/leonardo-da-vinci"
          rel="noreferrer"
          target="_blank"
        >
          Leonardo da Vinci
        </a>
      );
      geniusLevelMessage = "Fight with Michelangelo? It will end as a...draw.";
      geniusStyle = "leonardo";
      imgFormat = ".webp";
      break;

    case 15:
    case 16:
      geniusLevel = (
        <a
          href="https://www.biography.com/scientists/albert-einstein"
          rel="noreferrer"
          target="_blank"
        >
          Albert Einstein
        </a>
      );
      geniusLevelMessage = "Want to marry your cousin? It's all relative baby.";
      geniusStyle = "albert";
      imgFormat = ".jpg";
      break;

    default:
      geniusLevel = (
        <a
          href="https://knowyourmeme.com/memes/galaxy-brain"
          rel="noreferrer"
          target="_blank"
        >
          Galaxy Brain
        </a>
      );
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
          Highest Score:
          <span className={classes.score}> {highestScore} PTS</span>
        </div>
        <div className={classes.genius}>
          <div className={classes["genius-level"]}>
            Genius Level: <span>{geniusLevel}</span>
          </div>
          <div className={classes["genius-style"]}>
            <img
              className={`${classes["genius-img"]} ${classes[geniusStyle]}`}
              src={require(`../../assets/images/geniuses/${geniusStyle}${imgFormat}`)}
              alt="genius-img"
            ></img>
          </div>

          <div className={`${classes.message} ${classes[geniusStyle]}`}>
            {geniusLevelMessage}
          </div>
        </div>
        <div className={classes.btn}>
          <PlayButton onClick={restartGameHandler} buttonLabel="Restart" />
          <PlayButton onClick={changeSettingsHandler} buttonLabel="Settings" />
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Modal>
        <div className={classes.gameover}>
          {!showPlayAgain && <GameOverMessage />}
          {showPlayAgain && <PlayAgain />}
        </div>
      </Modal>
    </Fragment>
  );
};

export default GameOver;
