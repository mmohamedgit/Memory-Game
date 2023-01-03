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

  let patternTheme = [];
  let newPattern = [];

  //modal to select button theme & difficulty
  //normal theme, office theme, elon musk theme
  //easy - 1x1, medium - 2x2, hard - 3x3

  patternTheme = ["redColour", "blueColour", "greenColour", "yellowColour"];

  const addNextSequence = () => {
    setFreezeButton(true);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColour = patternTheme[randomNumber];

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

      const addNextSequenceTimer = setTimeout(() => {
        addNextSequence();
      }, 3000);

      return () => {
        clearTimeout(addNextSequenceTimer);
      };
    }
  };

  useEffect(() => {
    let interval;
    let currentIndex = 0;

    const showGamePattern = () => {
      // To prevent the User from clicking the game buttons during the sequence duration
      setFreezeButton(true);

      //This sets the flash CSS class for each button based in the gamePattern array

      if (currentIndex < gamePattern.length) {
        const currentColor = gamePattern[currentIndex];
        setFlashButton(currentColor);
        playSound(SequenceSound);
        // Reset the flash class after a short delay of 300ms
        const resetFlashTimer = setTimeout(() => {
          setFlashButton(null);
        }, 300);

        currentIndex++;

        return () => {
          clearTimeout(resetFlashTimer);
        };
      } else {
        setFreezeButton(false);
        clearInterval(interval);
      }
    };

    interval = setInterval(showGamePattern, 1000);

    // This clears the timer when the component unmounts for every second until the last item in the gamePattern array
    return () => {
      clearInterval(interval);
    };
  }, [gamePattern]);

  // The high score changes if the User beat its previous high score
  useEffect(() => {
    if (highestScore < gamePattern.length - 1) {
      setHighestScore(() => gamePattern.length - 1);
    }
  }, [highestScore, gamePattern.length]);

  const buttonClickHandler = (clickedItem) => {
    if (gameStarted) {
      // If the User clicked the matching colour of the game pattern
      playSound(ButtonClickSound);
      if (gamePattern[playingIndex] === clickedItem) {
        // If the User clicked the last item of the pattern, game goes to the next level and next sequence is added
        if (playingIndex === gamePattern.length - 1) {
          const nextSequenceTimer = setTimeout(() => {
            setPlayingIndex(0);
            addNextSequence();
          }, 300);

          return () => {
            clearTimeout(nextSequenceTimer);
          };
          // If the User is missing some items of the game pattern to be clicked
        } else {
          setPlayingIndex(playingIndex + 1);
        }
      } else {
        // If the User clicked on the wrong pattern, gamePattern resets to an empty array
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
          {patternTheme.map((item, index) => {
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
