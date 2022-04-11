import React from "react";

import classes from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <div>
      <div className={classes.label} htmlFor={props.id}>
        {props.label}
      </div>
      <textarea id={props.id} rows="4" cols="50" />
    </div>
  );
};

export default TextArea;
