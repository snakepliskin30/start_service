import React, { createContext, useState, useEffect, useCallback } from "react";
import { useServiceCloudEnv } from "../hooks/useServiceCloudEnv";

const StartServiceContext = createContext();

export const StartServiceContextProvider = ({ children }) => {
  const {
    osvcExtensionProv,
    osvcSessionToken,
    osvcProfileId,
    osvcLoginName,
    osvcInterfaceUrl,
    osvcInterfaceUrlREST,
    getOsVcEnvValues,
  } = useServiceCloudEnv();

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
      }}
    >
      {children}
    </StartServiceContext.Provider>
  );
};

export default StartServiceContext;
