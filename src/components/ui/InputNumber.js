import React from "react";
import ReactDOM from "react-dom";
import Cleave from "cleave.js/react";

import classes from "./InputNumber.module.css";

const InputNumber = (props) => {
  const onChangeHandler = (e) => {
    console.log(e.target.value);
  };

  //   return <Cleave placeholder="Enter your credit card number" />;
  return (
    <div className={classes.main}>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
      </div>
      <Cleave options={props.options} />
    </div>
  );
};

export default InputNumber;
