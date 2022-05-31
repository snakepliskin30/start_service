import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./Paperless.module.css";

import StartServiceContext from "../../store/StartServiceContext";

function Paperless() {
  const ctx = useContext(StartServiceContext);
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const runCreditHandler = () => {};

  const paperlessNext = () => {
    ctx.setOpenPaperless(false);
    ctx.setOpenMailingAddress(true);
  };

  const paperlessPrevious = () => {
    ctx.setOpenPaperless(false);
    ctx.setOpenLease(true);
  };
  return (
    <Accordion title="Paperless Billing" id="paperlessBilling" open={ctx.openPaperless} setOpen={ctx.setOpenPaperless}>
      <div className={classes.main}>
        <div className={classes.paperlessForm}>
          <Input label="Paperless Action" id="depositAmount" value={streetName} onChange={setStreetName} required={true} />
          <Input label="Email Address" id="depositAmount" value={streetName} onChange={setStreetName} />
          <Input label="Days Before Due Date" id="depositAmount" value={streetName} onChange={setStreetName} />
        </div>
        <div className={classes.paperless_info} style={{ justifyContent: "center" }}>
          <div></div>
          <div className={`checkbox`}>
            <input
              type="checkbox"
              id="paperlessReminderEmail"
              name="paperlessReminderEmail"
              value={false}
              //   onChange={(e) => {
              //     setEmailNotProvided(e.target.checked);
              //   }}
            />
            <label htmlFor="paperlessReminderEmail">Reminder Email</label>
          </div>
          <div></div>
        </div>

        <div className={classes.paperless_btn}>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel onClick={paperlessPrevious}>Previous</ButtonCancel>
            <ButtonSubmit onClick={paperlessNext}>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default Paperless;
