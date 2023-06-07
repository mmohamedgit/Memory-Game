import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { gameActions } from "../../store/game-slice.js";
import Header from "../Header/Header.js";
import GameTile from "./GameTile.js";
import GameLevel from "./GameLevel";
import classes from "./MemoryGame.module.css";

const MemoryGame = () => {
  const dispatch = useDispatch();

  const gamePattern = useSelector((state) => state.game.gamePattern);
  const tiles = useSelector((state) => state.game.tiles);
  const numberOfTiles = useSelector((state) => state.game.numberOfTiles);
  const isGameStarted = useSelector((state) => state.game.isGameStarted);
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const highestScore = useSelector((state) => state.game.highestScore);

  useEffect(() => {
    if (!isGameStarted) {
      dispatch(gameActions.startGame());

      const addNextSequenceTimer = setTimeout(() => {
        dispatch(gameActions.addNextSequence());
      }, 3000);

      return () => {
        clearTimeout(addNextSequenceTimer);
      };
    }
  }, []);

  useEffect(() => {
    let interval;
    let currentIndex = 0;

    if (gamePattern.length > 0) {
      const showGamePattern = () => {
        // To prevent the User from clicking the game buttons during the sequence duration
        dispatch(gameActions.freezeTiles(true));

        //This sets the flash CSS class for each button based in the gamePattern array
        if (gamePattern && currentIndex < gamePattern.length) {
          const currentColor = gamePattern[currentIndex];

          dispatch(gameActions.flashTile(currentColor));

          // Reset the flash class after a short delay of 300ms
          const resetFlashTimer = setTimeout(() => {
            dispatch(gameActions.flashTile(null));
          }, 300);

          currentIndex++;
          return () => {
            clearTimeout(resetFlashTimer);
          };
        } else {
          clearInterval(interval);
          dispatch(gameActions.freezeTiles(false));
        }
      };

      interval = setInterval(showGamePattern, 1000);

      // This clears the timer when the component unmounts for every second until the last item in the gamePattern array
      return () => {
        clearInterval(interval);
      };
    }
  }, [gamePattern, dispatch]);

  // The high score changes if the User beat its previous high score
  useEffect(() => {
    if (highestScore < gamePattern.length - 1) {
      dispatch(gameActions.storeHighestScore(gamePattern.length - 1));
    }
  }, [highestScore, gamePattern.length, dispatch]);

  return (
    <div className={`${classes.app}${isGameOver ? classes.gameover : ""}`}>
      <main>
        <Header />
        {!isGameOver && isGameStarted && (
          <div className={classes["gamebutton-section"]}>
            <GameLevel />
            <div
              className={`${classes["gamebutton-layout"]} ${
                classes["tiles-" + numberOfTiles]
              }`}
              tabIndex={0}
            >
              {tiles.map((tile, index) => (
                <GameTile key={tile} id={index} tile={tile} />
              ))}
            </div>
          </div>
        )}
        {isGameStarted && (
          <div className={classes["high-score"]}>
            <h1>HIGH SCORE: {highestScore}</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default MemoryGame;
