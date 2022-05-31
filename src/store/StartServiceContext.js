import React, { createContext, useState, useCallback } from "react";

const StartServiceContext = createContext({
  openPremise: "",
  openCustomerInfo: "",
  openCreditCheck: "",
  openDeposit: "",
  openLease: "",
  openPaperless: "",
  openMailingAddress: "",
  openRateOptions: "",
  openFinalItems: "",
  setOpenPremise: () => {},
  setOpenCustomerInfo: () => {},
  setOpenCreditCheck: () => {},
  setOpenDeposit: () => {},
  setOpenLease: () => {},
  setOpenPaperless: () => {},
  setOpenMailingAddress: () => {},
  setOpenRateOptions: () => {},
  setOpenFinalItems: () => {},
});

export const StartServiceContextProvider = ({ children }) => {
  const [openPremise, setOpenPremise] = useState(true);
  const [openCustomerInfo, setOpenCustomerInfo] = useState(false);
  const [openCreditCheck, setOpenCreditCheck] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openLease, setOpenLease] = useState(false);
  const [openPaperless, setOpenPaperless] = useState(false);
  const [openMailingAddress, setOpenMailingAddress] = useState(false);
  const [openRateOptions, setOpenRateOptions] = useState(false);
  const [openFinalItems, setOpenFinalItems] = useState(false);

  return (
    <StartServiceContext.Provider
      value={{
        openPremise,
        openCustomerInfo,
        openCreditCheck,
        openDeposit,
        openLease,
        openPaperless,
        openMailingAddress,
        openRateOptions,
        openFinalItems,
        setOpenPremise,
        setOpenCustomerInfo,
        setOpenCreditCheck,
        setOpenDeposit,
        setOpenLease,
        setOpenPaperless,
        setOpenMailingAddress,
        setOpenRateOptions,
        setOpenFinalItems,
      }}
    >
      {children}
    </StartServiceContext.Provider>
  );
};

export default StartServiceContext;
