import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../store/game-slice";
import classes from "./GameTile.module.css";

const GameTile = (props) => {
  const { id, tile } = props;

  const dispatch = useDispatch();
  const flashTile = useSelector((state) => state.game.flashTile);
  const freezeTiles = useSelector((state) => state.game.freezeTiles);
  const isClickedTile = useSelector((state) => state.game.isClickedTile);
  const isGameStarted = useSelector((state) => state.game.isGameStarted);
  const gamePattern = useSelector((state) => state.game.gamePattern);
  const playingIndex = useSelector((state) => state.game.playingIndex);

  const btnClasses = `${classes["button-pattern"]} ${classes[tile]} ${
    isClickedTile[id] && classes.pressed
  } ${tile === flashTile ? classes["flash-tile"] : ""}`;

  useEffect(() => {
    if (isClickedTile) {
      const pressedEffectTimer = setTimeout(() => {
        dispatch(gameActions.isClickedTile({ id: id, value: false }));
      }, 100);
      return () => {
        clearTimeout(pressedEffectTimer);
      };
    }
  }, [isClickedTile, id, dispatch]);

  const tileClickHandler = () => {
    if (freezeTiles) {
      return;
    }

    dispatch(gameActions.isClickedTile({ id: id, value: true }));

    if (isGameStarted) {
      // If the player clicked the matching tile of the game pattern
      if (gamePattern[playingIndex] === tile) {
        // If the User clicked the last item of the pattern, game goes to the next level and next sequence is added
        if (playingIndex === gamePattern.length - 1) {
          const nextSequenceTimer = setTimeout(() => {
            dispatch(gameActions.storePlayingIndex(0));
            dispatch(gameActions.addNextSequence());
          }, 300);

          return () => {
            clearTimeout(nextSequenceTimer);
          };
          // If the player is missing some items of the game pattern to be clicked
        } else {
          dispatch(gameActions.storePlayingIndex(playingIndex + 1));
        }
      } else {
        // If the player clicked on the wrong pattern, gamePattern resets to an empty array and the current score is saved
        dispatch(gameActions.storeCurrentScore(gamePattern.length - 1));
        dispatch(gameActions.gameOver());
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        id={id}
        className={btnClasses}
        onClick={tileClickHandler}
      />
    </div>
  );
};

export default GameTile;
