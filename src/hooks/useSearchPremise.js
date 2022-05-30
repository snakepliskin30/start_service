import { useState } from "react";

const useSearchPremise = () => {
  const [premiseSearchLoad, setPremiseSearchLoad] = useState(false);

  const searchPremise = async (streetName, city, state, zip) => {
    setPremiseSearchLoad(true);
    const interfaceUrl =
      "https://gpcservice--tst1.custhelp.com/cgi-bin/gpcservice.cfg";

    const Request = {};
    const Payload = {};

    Payload.formattedAddress = streetName;
    Payload.city = city;
    Payload.state = state;
    Payload.zip = zip;

    Request.Payload = Payload;

    const requestString = JSON.stringify(Request);
    // const url = `https://gpcservice--tst1.custhelp.com/cgi-bin/gpcservice.cfg/php/custom/socoapicalls_noauth.php`;
    const url =
      process.env.NODE_ENV === "production"
        ? `${interfaceUrl}/php/custom/socoapicalls.php`
        : process.env.REACT_APP_DEV_URL;
    const formData = new FormData();
    formData.append("data", requestString);
    formData.append("apiUrl", "CUSTOM_CFG_START_SEARCH_PREMISE_URL");

    console.log("url", url);

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
    const premiseResults = Array.from(
      new Set(data.Payload.AddressInfo.map((s) => s.premiseNo))
    ).map((premiseNum) =>
      data.Payload.AddressInfo.find((d) => d.premiseNo === premiseNum)
    );
    setPremiseSearchLoad(false);
    return premiseResults;
    // setPremiseResults(premiseResults);
    // setSearchFormShow(false);
    // setSearchResultShow(true);
    // setSearchInfoShow(false);
    // setApiCallFlag(false);
  };

  return { premiseSearchLoad, searchPremise };
};

export default useSearchPremise;
