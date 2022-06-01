import React from "react";

import classes from "./InputSelect.module.css";

function InputSelect(props) {
  const isValid = props.error ? classes.invalid : "";
  return (
    <div className={isValid} data-error={props.error}>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
        <span className={classes.required}>{props.required ? "*" : ""}</span>
      </div>
      <select
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      >
        <option value="" disabled key="-1" style={{ display: "none" }}>
          Select...
        </option>
        {props.options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.display}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
