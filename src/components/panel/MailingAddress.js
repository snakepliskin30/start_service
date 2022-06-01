import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import InputSelect from "../ui/InputSelect";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./MailingAddress.module.css";

import StartServiceContext from "../../store/StartServiceContext";

import { stateOptions } from "../../lov/options";

function MailingAddress() {
  const ctx = useContext(StartServiceContext);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const runCreditHandler = () => {};

  const mailingNext = () => {
    ctx.setOpenMailingAddress(false);
    ctx.setOpenRateOptions(true);
  };

  const mailingPrevious = () => {
    ctx.setOpenMailingAddress(false);
    ctx.setOpenPaperless(true);
  };
  return (
    <Accordion
      title="Mailing Address"
      id="mailingAddress"
      open={ctx.openMailingAddress}
      setOpen={ctx.setOpenMailingAddress}
    >
      <div className={classes.main}>
        <div className={classes.mailing_info}>
          <div className={`checkbox`}>
            <input
              type="checkbox"
              id="sameAsPremise"
              name="sameAsPremise"
              value={false}
              //   onChange={(e) => {
              //     setEmailNotProvided(e.target.checked);
              //   }}
            />
            <label htmlFor="sameAsPremise">Same as Premise Address</label>
          </div>
        </div>

        <div className={classes.mailingForm}>
          <Input
            label="Address Line 1"
            id="mailingAddressLine1"
            value={addressLine1}
            onChange={setAddressLine1}
          />
          <Input
            label="Address Line 2"
            id="mailingAddressLine2"
            value={addressLine2}
            onChange={setAddressLine2}
          />
        </div>
        <div className={classes.mailingForm}>
          <div className={classes.mailingForm}>
            <Input
              label="City"
              id="mailingCity"
              value={city}
              onChange={setCity}
            />
            <InputSelect
              label="State"
              id="mailingState"
              value={state}
              onChange={setState}
              options={stateOptions}
            />
            <InputNumber
              label="Zip"
              id="mailingZip"
              options={{ blocks: [5] }}
              value={zip}
              onChange={setZip}
            />
          </div>
          <div></div>
        </div>

        <div className={classes.mailing_btn}>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel onClick={mailingPrevious}>Previous</ButtonCancel>
            <ButtonSubmit onClick={mailingNext}>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default MailingAddress;
