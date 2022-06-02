export const getPremise = async (premiseNo, companyCode, profileId, token, interfaceUrl, userId) => {
  const Request = {};
  const Payload = {};
  const GetPremise = { premiseNo, companyCode };
  GetPremise.BaseRequest = {
    transactionId: "12345678",
    userId: process.env.NODE_ENV === "production" ? userId : process.env.REACT_APP_OSVC_USER_ID,
  };
  Payload.GetPremise = GetPremise;

  Request.Payload = Payload;

  const requestString = JSON.stringify(Request);
  const url = process.env.NODE_ENV === "production" ? `${interfaceUrl}/php/custom/socoapicalls.php` : process.env.REACT_APP_DEV_URL;
  const formData = new FormData();
  formData.append("data", requestString);
  formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_GET_PREMISE");

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
  return data;
};
