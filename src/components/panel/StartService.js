import { useState, useEffect } from "react";
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

import { StartServiceContextProvider } from "../../store/StartServiceContext";
import useStartServiceStore from "../../store/StartServiceStore";

import "./StartService.css";
import "bootstrap/dist/css/bootstrap.min.css";

const StartService = () => {
  const startAccountNumber = useStartServiceStore((state) => state.startAccountNumber);
  return (
    <div style={{ position: "relative" }} data-ws-id="startservice_1234">
      {startAccountNumber && (
        <div className="banner-success banner-container shadow-sm border-left border-success mt-3 mx-3">
          <div className="border border-left-0 py-2 px-3">
            <div className="row">
              <div className="col-auto d-flex align-items-center pr-1">
                <div className="banner-icon position-relative border border-success text-success rounded-circle p-2 d-inline-block align-middle">
                  <i className="position-absolute fas fa-check"></i>
                </div>
              </div>
              <div className="col d-flex align-items-center pl-0">
                <div className="banner-message d-inline-block align-middle m-0 px-2">
                  Start Service was Successful. Account Number: {`${startAccountNumber.slice(0, 5)}-${startAccountNumber.slice(-5)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!startAccountNumber && (
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
      )}
    </div>
  );
};

export default StartService;
