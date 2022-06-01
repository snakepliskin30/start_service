import React, { useEffect } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

import classes from "./InputDatePicker.module.css";

const InputDatePicker = (props) => {
  const isValid = props.error ? classes.invalid : "";
  useEffect(() => {
    $(`#${props.id}`).datepicker({
      changeYear: props?.changeYear ? props?.changeYear : false,
      yearRange: "-100:+0",
      onSelect: props.onChange,
    });
    $(`#${props.id}`).datepicker("setDate", props.value);

    return () => {
      $(`#${props.id}`).datepicker("destroy");
    };
  }, []);

  return (
    <div className={isValid} data-error={props.error}>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
        <span className={classes.required}>{props.required ? "*" : ""}</span>
      </div>
      <input id={props.id} type={props.type ? props.type : "text"} />
    </div>
  );
};

export default InputDatePicker;
