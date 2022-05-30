import { useState } from "react";
import { getPremise } from "./getPremise";
import { getPremiseMeters } from "./getPremiseMeters";
import { getObligations } from "./getObligations";

const usePremiseDetails = () => {
  const [premiseDetailsLoad, setPremiseDetailsLoad] = useState(false);

  const getPremiseDetails = async (premiseNo, companyCode) => {
    setPremiseDetailsLoad(true);
    const response = await Promise.allSettled([
      getPremise(premiseNo, "2"),
      getPremiseMeters(premiseNo),
      getObligations(premiseNo, "3"),
    ]);

    setPremiseDetailsLoad(false);
    return {
      GetPremise: response[0].value.Payload.GetPremise,
      GetPremiseMeters: response[1].value.Payload.GetPremiseMeters,
      GetObligation:
        response[2].value.Payload.GetObligation.Premise?.Obligation ?? [],
    };
  };

  return { premiseDetailsLoad, getPremiseDetails };
};

export default usePremiseDetails;
