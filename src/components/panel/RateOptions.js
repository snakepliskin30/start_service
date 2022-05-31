import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./RateOptions.module.css";

import StartServiceContext from "../../store/StartServiceContext";

function Paperless() {
  const ctx = useContext(StartServiceContext);
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const rateNext = () => {
    ctx.setOpenRateOptions(false);
    ctx.setOpenFinalItems(true);
  };

  const ratePrevious = () => {
    ctx.setOpenRateOptions(false);
    ctx.setOpenMailingAddress(true);
  };
  return (
    <Accordion title="Rate Options" id="rateOptions" open={ctx.openRateOptions} setOpen={ctx.setOpenRateOptions}>
      <div className={classes.main}>
        <div className={classes.rateForm}>
          <Input label="Rate Options" id="depositAmount" value={streetName} onChange={setStreetName} required={true} />
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
