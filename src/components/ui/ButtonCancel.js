import React from "react";

import classes from "./ButtonCancel.module.css";

const ButtonCancel = (props) => {
  return (
    <button className={classes.cancel} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default ButtonCancel;
