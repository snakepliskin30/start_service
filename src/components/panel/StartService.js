import { Fragment } from "react";
import Accordion from "../layout/Accordion";
import CustomerInfo from "./CustomerInfo";
import PremiseInfo from "./PremiseInfo";

import classes from "./StartService.css";

const StartService = () => {
  return (
    <Fragment>
      <PremiseInfo />
      <CustomerInfo />
    </Fragment>
  );
};

export default StartService;
