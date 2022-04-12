import React, { useEffect, useState } from "react";

import classes from "./Section.module.css";

const Section = (props) => {
  const [isSectionOpen, setSectionOpen] = useState(false);
  console.log("isSectionOpen", isSectionOpen, props.title);

  const clickSectionHeaderHandler = () => {
    setSectionOpen((current) => !current);
  };

  useEffect(() => {
    setSectionOpen(props.open);
  }, [props.open]);

  const iconPosition = isSectionOpen ? `${classes.header} ${classes.pointdown}` : `${classes.header}`;

  const noBtn = props.noBtn ? `${classes.noBtn}` : "";
  return (
    <div className={classes.section}>
      <button className={`${iconPosition} ${noBtn}`} onClick={clickSectionHeaderHandler}>
        {props.title}
      </button>
      {isSectionOpen && <div className={classes.content}>{props.children}</div>}
    </div>
  );
};

export default Section;
