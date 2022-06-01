import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./RateOptions.module.css";

import StartServiceContext from "../../store/StartServiceContext";

import { rateOptions as rateOptionList } from "../../lov/options";

function Paperless() {
  const ctx = useContext(StartServiceContext);
  const [rateOptions, setRateOptions] = useState("Residential");
  const [rateOptionsValidation, setRateOptionsValidation] = useState({
    error: "",
  });

  const validate = () => {
    let isValid = true;
    if (!rateOptions) {
      isValid(false);
      setRateOptionsValidation({ error: "Rate Option is required" });
    } else setRateOptionsValidation({ error: "" });
    return isValid;
  };

  const rateNext = () => {
    if (validate()) ctx.setOpenRateOptions(false);
    ctx.setOpenFinalItems(true);
  };

  const ratePrevious = () => {
    ctx.setOpenRateOptions(false);
    ctx.setOpenMailingAddress(true);
  };
  return (
    <Accordion
      title="Rate Options"
      id="rateOptions"
      open={ctx.openRateOptions}
      setOpen={ctx.setOpenRateOptions}
    >
      <div className={classes.main}>
        <div className={classes.rateForm}>
          <InputSelect
            label="Rate Options"
            id="depositAmount"
            value={rateOptions}
            onChange={setRateOptions}
            required={true}
            options={rateOptionList}
            error={rateOptionsValidation.error}
          />
          <div></div>
          <div></div>
        </div>

        <div className={classes.rate_btn}>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel onClick={ratePrevious}>Previous Next</ButtonCancel>
            <ButtonSubmit onClick={rateNext}>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default Paperless;
