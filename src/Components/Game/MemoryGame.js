import { useState, useEffect, Fragment } from "react";

import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";

import GameTiles from "./GameTiles.js";
import GameLevel from "./GameLevel";
import GameOver from "./GameOver";
import Settings from "./Settings.js";
import classes from "./MemoryGame.module.css";

import GameOverSound from "../../assets/sounds/gameover.mp3";
import TileClickSound from "../../assets/sounds/game-button-click.mp3";
import SequenceSound from "../../assets/sounds/sequence.mp3";
import StartSound from "../../assets/sounds/start.mp3";

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
  const [flashTile, setFlashTile] = useState(null);
  const [freezeTiles, setFreezeTiles] = useState(true);

  if (!playedPreviousGame && isGameOver && highestScore > 0) {
    setPlayedPreviousGame(true);
  }

  const addNextSequence = (pattern) => {
    setFreezeTiles(true);

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

    //console.log(newPattern);
  };

  const playSound = (name) => {
    var audio = new Audio(name);
    audio.play();
  };

  const resetPattern = () => {
    setIsGameOver(true);
    setPlayingIndex(0);
    setgamePattern([]);
    setgameStarted(false);
  };

  const restartGame = () => {
    startGame();
  };

  const startGame = (pattern, gameOverPhotos, theme) => {
    setIsGameOver(false);
    setFreezeTiles(true);

    console.log(pattern);

    if (pattern && gameOverPhotos && theme) {
      let chosenPattern = [];
      chosenPattern.push(...pattern);

      setSelectedPattern(() => chosenPattern);

      setGameOverImages(() => gameOverPhotos);

      setSelectedTheme(() => theme);
    }

    if (!gameStarted) {
      setgameStarted(true);
      playSound(StartSound);
      setFreezeTiles(true);
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
      setFreezeTiles(true);

      //This sets the flash CSS class for each button based in the gamePattern array
      if (currentIndex < gamePattern.length) {
        const currentColor = gamePattern[currentIndex];
        setFlashTile(currentColor);
        playSound(SequenceSound);
        // Reset the flash class after a short delay of 300ms
        const resetFlashTimer = setTimeout(() => {
          setFlashTile(null);
        }, 300);

        currentIndex++;

        return () => {
          clearTimeout(resetFlashTimer);
        };
      } else {
        setFreezeTiles(false);
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

  const tileClickHandler = (clickedTile) => {
    if (gameStarted) {
      // To play the click sound when the player clicks on a tile
      playSound(TileClickSound);

      // If the player clicked the matching tile of the game pattern
      if (gamePattern[playingIndex] === clickedTile) {
        // If the User clicked the last item of the pattern, game goes to the next level and next sequence is added
        if (playingIndex === gamePattern.length - 1) {
          const nextSequenceTimer = setTimeout(() => {
            setPlayingIndex(0);
            addNextSequence();
          }, 300);

          return () => {
            clearTimeout(nextSequenceTimer);
          };
          // If the player is missing some items of the game pattern to be clicked
        } else {
          setPlayingIndex(playingIndex + 1);
        }
      } else {
        // If the player clicked on the wrong pattern, gamePattern resets to an empty array and the current score is saved
        setCurrentScore(() => gamePattern.length - 1);
        playSound(GameOverSound);
        resetPattern();
      }
    }
  };

  return (
    <Fragment>
      <div className={`${classes.app} ${isGameOver ? classes.gameover : ""}`}>
        <main>
          {isGameOver && (
            <GameOver
              score={currentScore}
              highScore={highestScore}
              gameOver={isGameOver}
              onStartGame={startGame}
              onRestartGame={restartGame}
              gameOverImages={gameOverImages}
            />
          )}
          <Settings onSelectedPattern={startGame} />

          {!isGameOver && gameStarted && (
            <Fragment>
              <Header
                theme={selectedTheme}
                difficulty={selectedPattern.length}
              />

              <div className={classes["gamebutton-section"]}>
                <GameLevel level={gamePattern} gameOver={isGameOver} />
                <div
                  className={`${classes["gamebutton-layout"]} ${
                    classes["tiles-" + selectedPattern.length]
                  }`}
                  tabIndex={0}
                >
                  {selectedPattern.map((tile, index) => {
                    return (
                      <GameTiles
                        key={tile}
                        id={index}
                        gameStarted={gameStarted}
                        gameOver={isGameOver}
                        gamePattern={gamePattern}
                        tile={tile}
                        freezeTiles={freezeTiles}
                        flashTile={flashTile}
                        onTileClick={tileClickHandler}
                      />
                    );
                  })}
                </div>
              </div>
            </Fragment>
          )}

          {playedPreviousGame && gameStarted && (
            <div className={classes["high-score"]}>
              <h1>HIGH SCORE: {highestScore}</h1>
            </div>
          )}
        </main>

        {!isGameOver && gameStarted && <Footer />}
      </div>
    </Fragment>
  );
};

export default MemoryGame;
