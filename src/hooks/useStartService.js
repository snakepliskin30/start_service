import { useState } from "react";

const useStartService = () => {
  const [startServiceLoad, setStartServiceLoad] = useState(false);
  const startServiceRequest = async (requestString, profileId, token, interfaceUrl) => {
    try {
      setStartServiceLoad(true);
      const url = process.env.NODE_ENV === "production" ? `${interfaceUrl}/php/custom/socoapicalls.php` : process.env.REACT_APP_DEV_URL;
      const formData = new FormData();
      formData.append("data", requestString);
      formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_CONNECT_SERVICE");

      const response = await fetch(url, {
        method: "post",
        credentials: "same-origin",
        headers: {
          P_SID: token,
          P_ID: profileId,
        },
        body: formData,
      });

      const data = await response.json();
      setStartServiceLoad(false);
      return data;
    } catch (err) {
      setStartServiceLoad(false);
    }
  };
  return { startServiceLoad, startServiceRequest };
};

export default useStartService;
