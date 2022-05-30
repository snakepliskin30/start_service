import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  const isValid = props.error ? classes.invalid : "";
  return (
    <div className={isValid} data-error={props.error}>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
        <span className={classes.required}>{props.required ? "*" : ""}</span>
      </div>
      <input
        id={props.id}
        type={props.type ? props.type : "text"}
        maxLength={props.length ? props.length : ""}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
