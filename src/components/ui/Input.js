import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
      </div>
      <input
        id={props.id}
        type={props.type ? props.type : "text"}
        maxLength={props.length ? props.length : ""}
      />
    </div>
  );
};

export default Input;
