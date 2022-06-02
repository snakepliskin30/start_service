import React, { createContext, useState, useEffect, useCallback } from "react";
import { useServiceCloudEnv } from "../hooks/useServiceCloudEnv";

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
  const { osvcExtensionProv, osvcSessionToken, osvcProfileId, osvcLoginName, osvcInterfaceUrl, osvcInterfaceUrlREST, getOsVcEnvValues } = useServiceCloudEnv();

  useEffect(() => {
    getOsVcEnvValues();
  }, [getOsVcEnvValues]);

  return (
    <StartServiceContext.Provider
      value={{
        osvcExtensionProv,
        osvcSessionToken,
        osvcProfileId,
        osvcLoginName,
        osvcInterfaceUrl,
        osvcInterfaceUrlREST,
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
