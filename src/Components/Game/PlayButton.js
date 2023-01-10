import classes from "./PlayButton.module.css";

const PlayButton = (props) => {
  const { gameOver, onClick, buttonLabel } = props;

  const btnClasses = `${classes.btn} ${gameOver ? classes["play-again"] : ""}`;

  return (
    <button className={btnClasses} onClick={onClick}>
      <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
      </svg>
      <span>{buttonLabel}</span>
    </button>
  );
};

export default PlayButton;
