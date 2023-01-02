import { useState, useEffect } from "react";
import Header from "../Game/Header";
import GameButton from "./GameButton";
import StartSound from "../../assets/sounds/start.mp3";
import ButtonClickSound from "../../assets/sounds/game-button-click.wav";
import SequenceSound from "../../assets/sounds/sequence.mp3";
import GameOverSound from "../../assets/sounds/gameover.mp3";
import GameOver from "./GameOver";
import classes from "./MemoryGame.module.css";
import PlayButton from "./PlayButton";

const MemoryGame = () => {
  const [gameStarted, setgameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gamePattern, setgamePattern] = useState([]);
  const [hideStartButton, setHideStartButton] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [flashButton, setFlashButton] = useState(null);
  const [freezeButton, setFreezeButton] = useState(true);

  let buttonTheme = [];
  let newPattern = [];

  //add state/if  to select button theme

  buttonTheme = ["redColour", "blueColour", "greenColour", "yellowColour"];

  const addNextSequence = () => {
    setFreezeButton(true);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColour = buttonTheme[randomNumber];

    newPattern = [...gamePattern, randomColour];

    setgamePattern(newPattern);

    console.log(newPattern);
  };

  //maybe export this in a separate file
  const playSound = (name) => {
    var audio = new Audio(name);
    audio.play();
  };

  const restartGameHandler = () => {
    setIsGameOver(false);
    startGame();
  };

  const resetPattern = () => {
    setFreezeButton(true);
    setIsGameOver(true);
    setgameStarted(false);
    setgamePattern([]);
    setPlayingIndex(0);
  };

  const startGame = () => {
    setFreezeButton(true);
    if (!gameStarted) {
      setgameStarted(true);
      setHideStartButton(true);
      playSound(StartSound);

      setTimeout(() => {
        addNextSequence();
      }, 3000);
    }
  };

  // useEffect to play the pattern sequence animation and this effect gets triggered with the change in the gamePattern after each level

  useEffect(() => {
    // The sequence will start after 1 second when the User clears the level
    const patternTimer = () => {
      setTimeout(() => {
        setFlashButton(() => null);
        showGamePattern();
      }, 1000);
    };

    // To loop through the patterns from the gamePattern array and set the CSS flash animation + sequence sound for each button pattern
    const showGamePattern = () => {
      setFreezeButton(true);
      if (gamePattern.length > 0) {
        gamePattern.forEach((item, i) => {
          const timer1 = setTimeout(() => {
            setFlashButton(item);
            playSound(SequenceSound);
          }, 1000 * (i + 1));

          return () => {
            clearTimeout(timer1);
          };
        });
      }

      // To prevent the User from clicking the game buttons during the sequence duration
      const freezeButtonTimer = setTimeout(() => {
        setFreezeButton(false);
      }, gamePattern.length * 1000);

      return () => {
        clearTimeout(freezeButtonTimer);
      };
    };

    patternTimer();
  }, [gamePattern]);

  const buttonClickHandler = (clickedItem) => {
    if (gameStarted) {
      // If the User clicked the matching colour of the game pattern
      playSound(ButtonClickSound);
      if (gamePattern[playingIndex] === clickedItem) {
        // If the User clicked the last item of the pattern
        if (playingIndex === gamePattern.length - 1) {
          setTimeout(() => {
            setPlayingIndex(0);
            addNextSequence();
          }, 300);
          // If the User is missing some items of the game pattern to be clicked
        } else {
          setPlayingIndex(playingIndex + 1);
        }
      } else {
        // To save the highest score in a state after the User clicked on the wrong pattern
        if (highestScore < gamePattern.length - 1) {
          setHighestScore(() => gamePattern.length - 1);
        }
        playSound(GameOverSound);
        resetPattern();
      }
    }
  };

  return (
    <div className={classes.app}>
      <Header
        level={gamePattern}
        highScore={highestScore}
        gameOver={isGameOver}
        hideStartButton={hideStartButton}
      />
      {isGameOver && (
        <GameOver
          gameOver={isGameOver}
          onRestartGame={restartGameHandler}
          highScore={highestScore}
        />
      )}
      {!hideStartButton && <PlayButton onClick={startGame} title="Start" />}
      {!isGameOver && hideStartButton && gameStarted && (
        <div className={classes["tile-2x2"]} tabIndex={0}>
          {buttonTheme.map((item, index) => {
            return (
              <GameButton
                key={index}
                id={index}
                gameStarted={gameStarted}
                gameOver={isGameOver}
                gamePattern={gamePattern}
                button={item}
                freezeButton={freezeButton}
                flashButton={flashButton}
                onButtonClick={buttonClickHandler}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
