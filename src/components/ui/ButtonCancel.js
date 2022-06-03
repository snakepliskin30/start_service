import React from "react";

import classes from "./ButtonCancel.module.css";

const ButtonCancel = (props) => {
  return (
    <button className={`${classes.cancel} ${props.disable ? classes.disable : ""}`} onClick={props.onClick} type={props.type ? props.type : "button"}>
      {props.children}
    </button>
  );
};

export default ButtonCancel;
