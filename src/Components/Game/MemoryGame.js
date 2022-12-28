import { useState, useEffect, Fragment } from "react";
import Header from "../Game/Header";
import GameButton from "./GameButton";
import ClickSound from "../../assets/sounds/click.wav";
import SequenceSound from "../../assets/sounds/sequence.mp3";
import GameOverSound from "../../assets/sounds/gameover.mp3";
import GameOver from "./GameOver";
import classes from "./MemoryGame.module.css";
import PlayButton from "./PlayButton";

const MemoryGame = (props) => {
  const [gameStarted, setgameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
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
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColour = buttonTheme[randomNumber];

    newPattern = [...gamePattern, randomColour];

    setgamePattern(newPattern);

    console.log(newPattern);
  };

  const resetGameHandler = () => {
    setGameOver(false);
    startGame();
  };

  const resetGame = () => {
    setgamePattern([]);
    setgameStarted(false);
    setPlayingIndex(0);
  };

  const startGame = () => {
    if (!gameStarted) {
      setHideStartButton(true);
      setgameStarted(true);
      addNextSequence();
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

    showGamePattern();
  }, [
    gamePattern,
    firstButton,
    secondButton,
    thirdButton,
    fourthButton,
    gameOver,
  ]);

  const buttonClickHandler = (clickedItem) => {
    if (gameStarted) {
      // User clicked the correct colour of the game pattern
      playSound(ClickSound);
      if (gamePattern[playingIndex] === clickedItem) {
        // User clicked the last item of the pattern
        if (playingIndex === gamePattern.length - 1) {
          setTimeout(() => {
            setPlayingIndex(0);
            addNextSequence();
          }, 300);
          // User missing some items of the game pattern to be clicked
        } else {
          setPlayingIndex(playingIndex + 1);
        }
      } else {
        if (highestScore < gamePattern.length - 1) {
          setHighestScore(() => gamePattern.length - 1);
          console.log(highestScore);
        }
        resetGame();
        setGameOver(true);
        playSound(GameOverSound);
      }
    }
  };

  const playSound = (name) => {
    var audio = new Audio(name);

    audio.play();
  };

  return (
    <Fragment>
      <Header
        level={gamePattern}
        gameStarted={gameStarted}
        gameOver={gameOver}
      />

      {gameOver && (
        <GameOver
          gameOver={gameOver}
          onResetGame={resetGameHandler}
          highestScore={highestScore}
        />
      )}

      {!hideStartButton ? (
        <PlayButton onClick={startGame} title="Start" />
      ) : (
        <div className={classes["tile-2x2"]} tabIndex={0}>
          {/* {buttonColours.map((colour, i) => {
          return (
            <Button
              key={colour}
              onSelectedItem={selectedItem}
              colour={colour}
              nextRandomSequence={nextRandomSequence}
              ref={buttonRefs.current[i]}
            />
          );
        })} */}
          <GameButton
            gameStarted={gameStarted}
            gameOver={gameOver}
            gamePattern={gamePattern}
            button={firstButton}
            freezeButton={freezeButton}
            flashNextSequence={flashFirstButton}
            onButtonClick={buttonClickHandler}
          />
          <GameButton
            gameStarted={gameStarted}
            gameOver={gameOver}
            gamePattern={gamePattern}
            button={secondButton}
            freezeButton={freezeButton}
            flashNextSequence={flashSecondButton}
            onButtonClick={buttonClickHandler}
          />
          <GameButton
            gameStarted={gameStarted}
            gameOver={gameOver}
            gamePattern={gamePattern}
            button={thirdButton}
            freezeButton={freezeButton}
            flashNextSequence={flashThirdButton}
            onButtonClick={buttonClickHandler}
          />
          <GameButton
            gameStarted={gameStarted}
            gameOver={gameOver}
            gamePattern={gamePattern}
            button={fourthButton}
            freezeButton={freezeButton}
            flashNextSequence={flashFourthButton}
            onButtonClick={buttonClickHandler}
          />
        </div>
      )}
    </Fragment>
  );
};

export default MemoryGame;
