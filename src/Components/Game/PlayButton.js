import classes from "./PlayButton.module.css";

const PlayButton = (props) => {
  const { gameOver } = props;

  const btnClasses = ` ${classes.play} ${
    gameOver ? classes["play-again"] : ""
  }`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default PlayButton;
