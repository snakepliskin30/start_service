import React from "react";
import ReactDOM from "react-dom";
import Cleave from "cleave.js/react";

import classes from "./InputNumber.module.css";

const InputNumber = (props) => {
  const isValid = props.error ? classes.invalid : "";
  return (
    <div className={isValid} data-error={props.error}>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
        <span className={classes.required}>{props.required ? "*" : ""}</span>
      </div>
      <Cleave
        options={{ ...props.options, numericOnly: true }}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        onBlur={(e) => {
          if (props.options?.numeral && props.options?.prefix === "$") {
            if (
              e.target.value.replace("$", "").trim().length === 0 ||
              parseFloat(e.target.value.replace("$", "").trim()) === 0
            ) {
              props.onChange("0.00");
            } else {
              props.onChange(
                parseFloat(e.target.value.replace("$", "").trim()).toFixed(2)
              );
            }
          }
        }}
        onFocus={(e) => {
          if (props.options?.numeral && props.options?.prefix === "$") {
            if (
              e.target.value.replace("$", "").trim().length === 0 ||
              parseFloat(e.target.value.replace("$", "").trim()) === 0
            ) {
              e.target.value = "";
            }
          }
        }}
      />
    </div>
  );
};

export default InputNumber;
