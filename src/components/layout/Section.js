import React, { useEffect, useState } from "react";

import classes from "./Section.module.css";

const Section = (props) => {
  const [isSectionOpen, setSectionOpen] = useState(props.open);

  const clickSectionHeaderHandler = () => {
    setSectionOpen((current) => !current);
  };

  useEffect(() => {
    if (isSectionOpen && props.renderTable) {
      props.renderTable();
    }
  }, [isSectionOpen]);

  const iconPosition = isSectionOpen
    ? `${classes.header} ${classes.pointdown}`
    : `${classes.header}`;

  const noBtn = props.noBtn ? `${classes.noBtn}` : "";
  return (
    <div className={classes.section}>
      <button
        className={`${iconPosition} ${noBtn}`}
        onClick={clickSectionHeaderHandler}
      >
        {props.title}
      </button>
      {isSectionOpen && <div className={classes.content}>{props.children}</div>}
    </div>
  );
};

export default Section;
