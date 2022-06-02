import React from "react";

import classes from "./Accordion.module.css";

const Accordion = (props) => {
  const headerId = `accordion-header-${props.id}`;

  const clickHeaderHandler = () => {
    // props.setOpen((current) => !current); // if using standard usestate from parent
    props.setOpen(!props.open); // if using zustand state management
  };

  const iconPosition = props.open
    ? `${classes.header} ${classes.pointdown} ${headerId}`
    : `${classes.header} ${headerId}`;

  return (
    <div className={classes.accordion}>
      <button className={iconPosition} onClick={clickHeaderHandler}>
        {props.title}
      </button>
      {props.open && <div className={classes.content}>{props.children}</div>}
      {/* <div className={classes.content}>{props.children}</div> */}
    </div>
  );
};

export default Accordion;
