import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";

import { useSelector } from "react-redux";
import classes from "./Modal.module.css";

// resusable Modals with a Backdrop for GameOptions & GameOver components

const ModalOverlay = (props) => {
  const isGameOver = useSelector((state) => state.game.isGameOver);

  const modalClasses = `${classes.modal} ${
    isGameOver ? classes["pan-zoom"] : classes["slide-down"]
  }`;

  return (
    <div className={modalClasses}>
      <div>{props.children}</div>
    </div>
  );
};

const ModalBackdrop = (props) => {
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const [flashRed, setFlashRed] = useState("flash-red");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFlashRed("");
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  const backDropClasses = `${classes.backdrop} ${
    isGameOver ? classes[flashRed] : ""
  }`;

  return <div className={backDropClasses}>{props.children}</div>;
};

//To render and overlay the Modal at the top-most hierarchy in the body - good for accessibility

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalBackdrop>
          <ModalOverlay>{props.children}</ModalOverlay>
        </ModalBackdrop>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
