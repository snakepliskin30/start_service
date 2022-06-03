import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useModalStore from "../../store/ModalStore";

import classes from "./Modal.module.css";

const Modal = (props) => {
  const showModal = useModalStore((state) => state.showModal);
  const setShowModal = useModalStore((state) => state.setShowModal);
  const modalYLoc = useModalStore((state) => state.modalYLoc);
  const setModalYLoc = useModalStore((state) => state.setModalYLoc);

  const modalShow = showModal
    ? `${classes.box} ${classes.active}`
    : `${classes.box}`;
  const modalShowOverlay = showModal
    ? `${classes.overlay} ${classes.active}`
    : `${classes.overlay}`;

  const boxStyle = () => {
    return {
      position: "absolute",
      top: modalYLoc,
      left: "50%",
      width: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "3px 3px 8px 0px rgba(0, 0, 0, 0.5)",
      zIndex: "9999",
      // transition: "all 0.3s ease-in-out",
      // opacity: "0",
    };
  };

  const hideModalHandler = () => {
    setShowModal(false);
    setModalYLoc(0);
  };

  return (
    <div className={classes.main}>
      <div className={modalShowOverlay} onClick={hideModalHandler}>
        <div className={modalShow} id="modal" style={boxStyle()}>
          <div className={classes.header}>
            <span>Add/Update Customer</span>
            <span className={classes.closeBtn} onClick={hideModalHandler}>
              &#10005;
            </span>
          </div>
          <div className={classes.message}>
            <span className={classes.text}>
              Please perform add/update customer.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  hideModalClick: PropTypes.func,
  modalFields: PropTypes.object,
  searchField: PropTypes.string,
  getOsvcParams: PropTypes.func,
  modalYLoc: PropTypes.number,
};

export default Modal;
