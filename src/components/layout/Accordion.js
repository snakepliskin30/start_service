import React, { useState, useEffect, useRef } from "react";

import classes from "./Accordion.module.css";

const Accordion = (props) => {
  const [isOpen, setOpen] = useState(false);
  const headerId = `accordion-header-${props.id}`;

  const clickHeaderHandler = () => {
    if (!isOpen) {
      document
        .querySelector(`.${headerId}`)
        .nextElementSibling.classList.add(`${classes.open}`);
    } else {
      document
        .querySelector(`.${headerId}`)
        .nextElementSibling.classList.remove(`${classes.open}`);
    }
    setOpen((current) => !current);
  };

  const iconPosition = isOpen
    ? `${classes.header} ${classes.pointdown} ${headerId}`
    : `${classes.header} ${headerId}`;

  return (
    <div className={classes.accordion}>
      <button className={iconPosition} onClick={clickHeaderHandler}>
        {props.title}
      </button>
      {/* {isOpen && <div className={classes.content}>{props.children}</div>} */}
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default Accordion;
