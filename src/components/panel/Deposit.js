import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Field from "../ui/Field";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./Deposit.module.css";

import StartServiceContext from "../../store/StartServiceContext";

function Deposit() {
  const ctx = useContext(StartServiceContext);
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const runCreditHandler = () => {};

  const depositNext = () => {
    ctx.setOpenDeposit(false);
    ctx.setOpenLease(true);
  };

  const depositPrevious = () => {
    ctx.setOpenDeposit(false);
    ctx.setOpenCreditCheck(true);
  };
  return (
    <Accordion title="Deposit" id="deposit" open={ctx.openDeposit} setOpen={ctx.setOpenDeposit}>
      <div className={classes.main}>
        <div className={classes.deposit_info}>
          <div className={`checkbox`}>
            <input
              type="checkbox"
              id="depositHold"
              name="depositHold"
              value={false}
              //   onChange={(e) => {
              //     setEmailNotProvided(e.target.checked);
              //   }}
            />
            <label htmlFor="depositHold">Deposit Hold</label>
          </div>
        </div>

        <form className={classes.depositForm} onSubmit={runCreditHandler}>
          <Input label="Deposit Action" id="depositAction" />
          <Input label="Deposit Amount" id="depositAmount" value={streetName} onChange={setStreetName} />
          <Field label="Average Monthly Bill" value="Pass" />
        </form>

        <div className={classes.deposit_btn}>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel onClick={depositPrevious}>Previous</ButtonCancel>
            <ButtonSubmit onClick={depositNext}>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default Deposit;
