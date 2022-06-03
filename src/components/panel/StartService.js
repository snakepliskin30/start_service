import { Fragment, useState, useCallback } from "react";
import CustomerInfo from "./CustomerInfo";
import PremiseInfo from "./PremiseInfo";
import CreditCheck from "./CreditCheck";
import Deposit from "./Deposit";
import Lease from "./Lease";
import Paperless from "./Paperless";
import MailingAddress from "./MailingAddress";
import RateOptions from "./RateOptions";
import FinalItems from "./FinalItems";
import Modal from "../layout/Modal";

import StartServiceContext, {
  StartServiceContextProvider,
} from "../../store/StartServiceContext";

import classes from "./StartService.css";

const StartService = () => {
  return (
    <div style={{ position: "relative" }}>
      <StartServiceContextProvider>
        <Modal />
        <PremiseInfo />
        <CustomerInfo />
        <CreditCheck />
        <Deposit />
        <Lease />
        <Paperless />
        <MailingAddress />
        <RateOptions />
        <FinalItems />
      </StartServiceContextProvider>
    </div>
  );
};

export default StartService;
