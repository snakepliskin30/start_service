import { useState, useCallback } from "react";

export const useServiceCloudEnv = () => {
  const [osvcExtensionProv, setOsvcExtensionProv] = useState(null);
  const [osvcGlobalContext, setOsvcGlobalContext] = useState(null);
  const [osvcSessionToken, setOsvcSessionToken] = useState("");
  const [osvcProfileId, setOsvcProfileId] = useState("");
  const [osvcInterfaceUrl, setOsvcInterfaceUrl] = useState("");
  const [osvcInterfaceUrlREST, setOsvcInterfaceUrlREST] = useState("");
  const [osvcEnvironmentParams, setOsvcEnvironmentParams] = useState({});
  const [osvcLoginName, setOsvcLoginName] = useState("");
  const [osvcLoginPhone, setOsvcLoginPhone] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const getOsVcEnvValues = useCallback(async () => {
    try {
      // eslint-disable-next-line no-undef
      const IExtensionProvider = await ORACLE_SERVICE_CLOUD.extension_loader.load("ExternalSearchResultsExt", "1");
      const globalContext = await IExtensionProvider.getGlobalContext();
      const sessionToken = await globalContext.getSessionToken();
      const profileId = globalContext.getProfileId();
      const interfaceUrl = globalContext.getInterfaceUrl();
      const interfaceUrlREST = globalContext.getInterfaceServiceUrl("REST");

      globalContext.invokeAction("getLoggedInDetails").then((loggedInName) => {
        const userDetails = loggedInName.result.find((i) => i != null);
        const userId = userDetails.login.split("@")[0].toUpperCase();
        const phone = userDetails.phone || userDetails.phone === "null" ? userDetails.phone : "";

        setOsvcExtensionProv(IExtensionProvider);
        setOsvcGlobalContext(globalContext);
        setOsvcSessionToken(sessionToken);
        setOsvcProfileId(profileId);
        setOsvcInterfaceUrl(interfaceUrl);
        setOsvcInterfaceUrlREST(interfaceUrlREST);
        setOsvcLoginName(userId);
        setOsvcLoginPhone(phone);
        setOsvcEnvironmentParams({
          osvcExtensionProv,
          osvcGlobalContext,
          osvcSessionToken,
          osvcProfileId,
          osvcLoginName,
          osvcInterfaceUrl,
          osvcInterfaceUrlREST,
        });
        IExtensionProvider.registerWorkspaceExtension(async (workspaceRecord) => {
          const IFieldDetails = await workspaceRecord.getFieldValues(["Contact.c$acct_num"]);
          setAccountNumber(IFieldDetails.getField("Contact.c$acct_num")?.getLabel()?.replace(/\W/g, ""));

          return true;
        });
      });
    } catch (err) {
      return true;
    }
  }, []);

  return {
    osvcExtensionProv,
    osvcGlobalContext,
    osvcSessionToken,
    osvcProfileId,
    osvcInterfaceUrl,
    osvcInterfaceUrlREST,
    osvcEnvironmentParams,
    accountNumber,
    getOsVcEnvValues,
  };
};
