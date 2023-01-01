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
  const [flashFirstButton, setFlashFirstButton] = useState(false);
  const [flashSecondButton, setFlashSecondButton] = useState(false);
  const [flashThirdButton, setFlashThirdButton] = useState(false);
  const [flashFourthButton, setFlashFourthButton] = useState(false);
  const [freezeButton, setFreezeButton] = useState(true);

  let buttonTheme = [];
  let newPattern = [];

  //add state/if  to select button theme

  buttonTheme = ["redColour", "blueColour", "greenColour", "yellowColour"];

  const firstButton = buttonTheme[0];
  const secondButton = buttonTheme[1];
  const thirdButton = buttonTheme[2];
  const fourthButton = buttonTheme[3];

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
    setFreezeButton(true);
    setIsGameOver(false);
    startGame();
  };

  const resetGame = () => {
    setIsGameOver(true);
    setgameStarted(false);
    setgamePattern([]);
    setPlayingIndex(0);
  };

  const startGame = () => {
    if (!gameStarted) {
      setgameStarted(true);
      setHideStartButton(true);
      playSound(StartSound);

      setTimeout(() => {
        addNextSequence();
      }, 3000);
    }
  };

  useEffect(() => {
    const showGamePattern = (index = 0) => {
      setFreezeButton(true);
      if (gamePattern.length > 0) {
        let timer1;
        let timer2;

        switch (gamePattern[index]) {
          case firstButton:
            console.log(gamePattern[index]);
            timer1 = setTimeout(() => {
              setFlashFirstButton(true);
              playSound(SequenceSound);

              timer2 = setTimeout(() => {
                setFlashFirstButton(false);
                nextPattern();
              }, 300);
            }, 300);
            break;

          case secondButton:
            console.log(gamePattern[index]);
            timer1 = setTimeout(() => {
              setFlashSecondButton(true);
              playSound(SequenceSound);

              timer2 = setTimeout(() => {
                setFlashSecondButton(false);
                nextPattern();
              }, 300);
            }, 300);
            break;

          case thirdButton:
            console.log(gamePattern[index]);
            timer1 = setTimeout(() => {
              setFlashThirdButton(true);
              playSound(SequenceSound);

              timer2 = setTimeout(() => {
                setFlashThirdButton(false);
                nextPattern();
              }, 300);
            }, 300);
            break;

          case fourthButton:
            console.log(gamePattern[index]);
            timer1 = setTimeout(() => {
              setFlashFourthButton(true);
              playSound(SequenceSound);

              timer2 = setTimeout(() => {
                setFlashFourthButton(false);
                nextPattern();
              }, 300);
            }, 300);
            break;

          default:
            break;
        }

        const nextPattern = () => {
          showGamePattern(index + 1);
        };

        const timer3 = setTimeout(() => {
          setFreezeButton(false);
        }, gamePattern.length * 300);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        };
      }
    };

    const patternTimer = () => {
      setTimeout(() => {
        showGamePattern();
      }, 1000);
    };

    patternTimer();
  }, [gamePattern, firstButton, secondButton, thirdButton, fourthButton]);

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
        if (highestScore < gamePattern.length - 1) {
          setHighestScore(() => gamePattern.length - 1);
          console.log(highestScore);
        }
        resetGame();
        playSound(GameOverSound);
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
      {!gamePattern && <p>Good Luck!</p>}
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
          {/* {buttonTheme.map((item, idx) => {
            let flashMe;
            if (flashFirstButton) {
              flashMe = true;
            }
            return (
              <GameButton
                key={item}
                gameStarted={gameStarted}
                gameOver={isGameOver}
                gamePattern={gamePattern}
                button={item}
                freezeButton={freezeButton}
                flashNextSequence={flashMe}
                onButtonClick={buttonClickHandler}
              />
            );
          })} */}
          <GameButton
            gameStarted={gameStarted}
            gameOver={isGameOver}
            gamePattern={gamePattern}
            button={firstButton}
            freezeButton={freezeButton}
            flashNextSequence={flashFirstButton}
            onButtonClick={buttonClickHandler}
          />
          <GameButton
            gameStarted={gameStarted}
            gameOver={isGameOver}
            gamePattern={gamePattern}
            button={secondButton}
            freezeButton={freezeButton}
            flashNextSequence={flashSecondButton}
            onButtonClick={buttonClickHandler}
          />
          <GameButton
            gameStarted={gameStarted}
            gameOver={isGameOver}
            gamePattern={gamePattern}
            button={thirdButton}
            freezeButton={freezeButton}
            flashNextSequence={flashThirdButton}
            onButtonClick={buttonClickHandler}
          />
          <GameButton
            gameStarted={gameStarted}
            gameOver={isGameOver}
            gamePattern={gamePattern}
            button={fourthButton}
            freezeButton={freezeButton}
            flashNextSequence={flashFourthButton}
            onButtonClick={buttonClickHandler}
          />
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
