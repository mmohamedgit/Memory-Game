import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

// resusable Modals with a Backdrop for GameOptions & GameOver components

const ModalOverlay = (props) => {
  const { gameOver } = props;

  const modalClasses = `${classes.modal} ${
    gameOver ? classes["pan-zoom"] : classes["slide-down"]
  }`;

  return (
    <div className={modalClasses}>
      <div>{props.children}</div>
    </div>
  );
};

const ModalBackdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.restartGame}>
      {props.children}
    </div>
  );
};

//To render and overlay the Modal at the top-most hierarchy in the body - good for accessibility

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
  const { gameOver } = props;
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalBackdrop>
          <ModalOverlay gameOver={gameOver}>{props.children}</ModalOverlay>
        </ModalBackdrop>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
