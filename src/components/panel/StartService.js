import React, { Fragment, Suspense } from "react";
import PremiseInfo from "./PremiseInfo";

import classes from "./StartService.css";

const CustomerInfo = React.lazy(() => import("./CustomerInfo"));

const StartService = () => {
  return (
    <div>
      <PremiseInfo />
      <CustomerInfo />
    </div>
  );
};

export default StartService;
