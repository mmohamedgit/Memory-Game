import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
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

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalBackdrop onClose={props.onClose}>
          <ModalOverlay>{props.children}</ModalOverlay>
        </ModalBackdrop>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
