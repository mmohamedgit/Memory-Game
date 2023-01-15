import { useState } from "react";
import classes from "./GameButton.module.css";

const GameButton = (props) => {
  const [isClickedItem, setIsClickedItem] = useState(false);

  const { id, button, freezeButton, flashButton } = props;

  const btnClasses = `${classes["button-pattern"]} ${classes[button]} ${
    isClickedItem && classes.pressed
  } ${button === flashButton ? classes["sequence-fade"] : ""}`;

  const buttonClickHandler = () => {
    if (freezeButton) return;
    setIsClickedItem(true);
    const clickedButton = button;

    props.onButtonClick(clickedButton);

    setTimeout(() => {
      setIsClickedItem(false);
    }, 100);
  };

  return (
    <div>
      <button id={id} className={btnClasses} onClick={buttonClickHandler} />
    </div>
  );
};

export default GameButton;
