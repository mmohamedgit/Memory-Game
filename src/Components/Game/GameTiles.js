import { useState } from "react";
import classes from "./GameButton.module.css";

const GameTiles = (props) => {
  const [isClickedTile, setIsClickedTile] = useState(false);

  const { id, tile, freezeTiles, flashTile } = props;

  const btnClasses = `${classes["button-pattern"]} ${classes[tile]} ${
    isClickedTile && classes.pressed
  } ${tile === flashTile ? classes["sequence-fade"] : ""}`;

  const tileClickHandler = () => {
    if (freezeTiles) {
      return;
    } else {
      setIsClickedTile(true);

      props.onTileClick(tile);

      setTimeout(() => {
        setIsClickedTile(false);
      }, 100);
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

export default GameTiles;
