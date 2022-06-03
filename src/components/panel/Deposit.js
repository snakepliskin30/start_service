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
import useAccordionPanelStore from "../../store/AccordionPanelStore";
import useDepositStore from "../../store/DepositStore";

import { depositActionOptions } from "../../lov/options";

function Deposit() {
  const ctx = useContext(StartServiceContext);
  const openDeposit = useAccordionPanelStore((state) => state.openDeposit);
  const setOpenDeposit = useAccordionPanelStore((state) => state.setOpenDeposit);
  const setOpenLease = useAccordionPanelStore((state) => state.setOpenLease);
  const setOpenCreditCheck = useAccordionPanelStore((state) => state.setOpenCreditCheck);
  const depositAction = useDepositStore((state) => state.depositAction);
  const depositAmount = useDepositStore((state) => state.depositAmount);
  const depositOnHold = useDepositStore((state) => state.depositOnHold);
  const setDepositAction = useDepositStore((state) => state.setDepositAction);
  const setDepositAmount = useDepositStore((state) => state.setDepositAmount);
  const setDepositOnHold = useDepositStore((state) => state.setDepositOnHold);
  // const [depositAction, setDepositAction] = useState("");
  // const [depositAmount, setDepositAmount] = useState("0.00");
  const [aveMonthlyBill, setAveMonthlyBill] = useState("");

  const depositNext = () => {
    setOpenDeposit(false);
    setOpenLease(true);
  };

  const depositPrevious = () => {
    setOpenDeposit(false);
    setOpenCreditCheck(true);
  };
  return (
    <Accordion title="Deposit" id="deposit" open={openDeposit} setOpen={setOpenDeposit}>
      <div className={classes.main}>
        <div className={classes.deposit_info}>
          <div className={`checkbox`}>
            <input
              type="checkbox"
              id="depositHold"
              name="depositHold"
              value={depositOnHold}
              onChange={(e) => {
                setDepositOnHold(e.target.checked);
              }}
            />
            <label htmlFor="depositHold">Deposit Hold</label>
          </div>
        </div>

        <div className={classes.depositForm}>
          <InputSelect label="Deposit Action" id="depositAction" value={depositAction} onChange={setDepositAction} options={depositActionOptions} />
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
