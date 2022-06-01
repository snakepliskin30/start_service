import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Field from "../ui/Field";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import InputSelect from "../ui/InputSelect";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./Deposit.module.css";

import StartServiceContext from "../../store/StartServiceContext";

import { depositActionOptions } from "../../lov/options";

function Deposit() {
  const ctx = useContext(StartServiceContext);
  const [depositAction, setDepositAction] = useState("");
  const [depositAmount, setDepositAmount] = useState("0.00");
  const [aveMonthlyBill, setAveMonthlyBill] = useState("");

  const depositNext = () => {
    ctx.setOpenDeposit(false);
    ctx.setOpenLease(true);
  };

  const depositPrevious = () => {
    ctx.setOpenDeposit(false);
    ctx.setOpenCreditCheck(true);
  };
  return (
    <Accordion
      title="Deposit"
      id="deposit"
      open={ctx.openDeposit}
      setOpen={ctx.setOpenDeposit}
    >
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

        <div className={classes.depositForm}>
          <InputSelect
            label="Deposit Action"
            id="depositAction"
            value={depositAction}
            onChange={setDepositAction}
            options={depositActionOptions}
          />
          <InputNumber
            label="Deposit Amount"
            id="depositAmount"
            value={depositAmount}
            onChange={setDepositAmount}
            options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "$",
            }}
          />
          <Field label="Average Monthly Bill" value="Pass" />
        </div>

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
