export const getPremiseMeters = async (premiseNo, companyCode) => {
  const interfaceUrl =
    "https://gpcservice--tst1.custhelp.com/cgi-bin/gpcservice.cfg";

  const Request = {};
  const Payload = {};
  const GetPremiseMeters = { premiseNo };
  const BaseRequest = {
    transactionId: "12345678",
    userId: process.env.REACT_APP_OSVC_USER_ID,
  };
  Payload.BaseRequest = BaseRequest;
  Payload.GetPremiseMeters = GetPremiseMeters;

  Request.Payload = Payload;

  const requestString = JSON.stringify(Request);
  const url =
    process.env.NODE_ENV === "production"
      ? `${interfaceUrl}/php/custom/socoapicalls.php`
      : process.env.REACT_APP_DEV_URL;
  const formData = new FormData();
  formData.append("data", requestString);
  formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_GET_PREMISE_METERS");

  const response = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      P_SID: "",
      P_ID: "",
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};
