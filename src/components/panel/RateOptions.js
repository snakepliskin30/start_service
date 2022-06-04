import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./RateOptions.module.css";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";
import useRateStore from "../../store/RateStore";

import { rateOptions as rateOptionList } from "../../lov/options";

function Paperless() {
  const ctx = useContext(StartServiceContext);
  const openRateOptions = useAccordionPanelStore((state) => state.openRateOptions);
  const setOpenRateOptions = useAccordionPanelStore((state) => state.setOpenRateOptions);
  const setOpenFinalItems = useAccordionPanelStore((state) => state.setOpenFinalItems);
  const setOpenMailingAddress = useAccordionPanelStore((state) => state.setOpenMailingAddress);

  const rateOption = useRateStore((state) => state.rateOption);
  const setRateOption = useRateStore((state) => state.setRateOption);

  // const [rateOptions, setRateOptions] = useState("Residential");
  const [rateOptionsValidation, setRateOptionsValidation] = useState({
    error: "",
  });

  const validate = () => {
    console.log(rateOption);
    let isValid = true;
    if (!rateOption) {
      isValid = false;
      setRateOptionsValidation({ error: "Rate Option is required" });
    } else setRateOptionsValidation({ error: "" });
    return isValid;
  };

  const rateNext = () => {
    if (validate()) setOpenRateOptions(false);
    setOpenFinalItems(true);
  };

  const ratePrevious = () => {
    setOpenRateOptions(false);
    setOpenMailingAddress(true);
  };
  return (
    <Accordion title="Rate Options" id="rateOptions" open={openRateOptions} setOpen={setOpenRateOptions}>
      <div className={classes.main}>
        <div className={classes.rateForm}>
          <InputSelect
            label="Rate Options"
            id="depositAmount"
            value={rateOption}
            onChange={(val) => {
              setRateOption(val);
            }}
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

export default React.memo(Paperless);
