import React from "react";

import classes from "./TextArea.module.css";

const TextArea = (props) => {
  const isValid = props.error ? classes.invalid : "";
  return (
    <div className={isValid} data-error={props.error}>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
        <span className={classes.required}>{props.required ? "*" : ""}</span>
      </div>
      <textarea
        id={props.id}
        rows="4"
        cols="50"
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default TextArea;
