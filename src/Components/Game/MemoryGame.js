import { useState, useEffect } from "react";
import GameButton from "./GameButton";
import StartSound from "../../assets/sounds/start.mp3";
import ButtonClickSound from "../../assets/sounds/game-button-click.wav";
import SequenceSound from "../../assets/sounds/sequence.mp3";
import GameOverSound from "../../assets/sounds/gameover.mp3";
import GameOver from "./GameOver";
import classes from "./MemoryGame.module.css";
import GameLevel from "./GameLevel";
import GameOptions from "./GameOptions";

const MemoryGame = (props) => {
  const [playedPreviousGame, setPlayedPreviousGame] = useState(false);
  const [gameStarted, setgameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [gameOverImages, setGameOverImages] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [gamePattern, setgamePattern] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [flashButton, setFlashButton] = useState(null);
  const [freezeButton, setFreezeButton] = useState(true);

  if (!playedPreviousGame && isGameOver && highestScore > 0) {
    setPlayedPreviousGame(true);
  }

  const addNextSequence = (pattern) => {
    setFreezeButton(true);

    let chosenPattern;

    if (pattern) {
      chosenPattern = pattern;
    } else {
      chosenPattern = selectedPattern;
    }

    const patternLength = chosenPattern.length;

    const randomNumber = Math.floor(Math.random() * patternLength);
    const randomColour = chosenPattern[randomNumber];

    let newPattern = [];
    newPattern = [...gamePattern, randomColour];

    setgamePattern(newPattern);

    console.log(newPattern);
  };

  const playSound = (name) => {
    var audio = new Audio(name);
    audio.play();
  };

  const restartGame = () => {
    // setIsGameOver(false);

    startGame();
  };

  const resetPattern = () => {
    setIsGameOver(true);
    setPlayingIndex(0);
    setgamePattern([]);
    setgameStarted(false);
  };

  const startGame = (pattern, gameOverPhotos, theme) => {
    setIsGameOver(false);
    setFreezeButton(true);

    console.log(pattern);

    if (pattern && gameOverPhotos) {
      let chosenPattern = [];
      chosenPattern.push(...pattern);

      setSelectedPattern(() => chosenPattern);

      setGameOverImages(() => gameOverPhotos);

      setSelectedTheme(() => theme);
    }

    if (!gameStarted) {
      setgameStarted(true);
      playSound(StartSound);
      setFreezeButton(true);
      const addNextSequenceTimer = setTimeout(() => {
        addNextSequence(pattern, gameOverPhotos);
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
        setCurrentScore(() => gamePattern.length - 1);
        playSound(GameOverSound);
        resetPattern();
      }
    }
  };

  return (
    <div className={classes.app}>
      <div className={classes["game-header"]}>
        <p>
          Theme:<span>{selectedTheme}</span>
        </p>
        <p>
          Difficulty Level:
          {selectedPattern.length === 2 && <span>Easy</span>}
          {selectedPattern.length === 4 && <span>Medium</span>}
          {selectedPattern.length === 9 && <span>Hard</span>}
        </p>
      </div>

      {isGameOver && (
        <GameOver
          score={currentScore}
          highScore={highestScore}
          gameOver={isGameOver}
          onRestartGame={restartGame}
          onStartGame={startGame}
          gameOverImages={gameOverImages}
        />
      )}
      <GameOptions onSelectedPattern={startGame} />
      {!isGameOver && gameStarted && (
        <GameLevel level={gamePattern} gameOver={isGameOver} />
      )}

      {!isGameOver && gameStarted && (
        <div
          className={`${classes["gamebutton-layout"]} ${
            classes["tiles-" + selectedPattern.length]
          }`}
          tabIndex={0}
        >
          {selectedPattern.map((item, index) => {
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

      {playedPreviousGame && (
        <h1 className={classes["high-score"]}>HIGH SCORE: {highestScore}</h1>
      )}
    </div>
  );
};

export default MemoryGame;
