import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import InputDatePicker from "../ui/InputDatePicker";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./FinalItems.module.css";

import StartServiceContext from "../../store/StartServiceContext";

function FinalItems() {
  const ctx = useContext(StartServiceContext);
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [dateWanted, setDateWanted] = useState("");
  const runCreditHandler = () => {};

  const openAll = () => {
    ctx.setOpenPremise(true);
    ctx.setOpenCustomerInfo(true);
    ctx.setOpenCreditCheck(true);
    ctx.setOpenDeposit(true);
    ctx.setOpenLease(true);
    ctx.setOpenPaperless(true);
    ctx.setOpenMailingAddress(true);
    ctx.setOpenRateOptions(true);
    ctx.setOpenFinalItems(true);
  };

  const finalItemPrevious = () => {
    ctx.setOpenFinalItems(false);
    ctx.setOpenRateOptions(true);
  };
  return (
    <Accordion title="Final Items" id="finalItems" open={ctx.openFinalItems} setOpen={ctx.setOpenFinalItems}>
      <div className={classes.main}>
        <div className={classes.finalItemForm}>
          <InputDatePicker
            label="Date Wanted"
            id="dateWanted"
            onChange={(date) => {
              setDateWanted(date);
            }}
            value={dateWanted}
          />
          <div></div>
          <ButtonCancel>Go to Product Portal</ButtonCancel>
          <div></div>
        </div>
        <div>
          <h5>Would you like to review all panels</h5>
          <ButtonCancel onClick={openAll}>Expand All</ButtonCancel>
        </div>

        <div className={classes.finalItem_btn}>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel>Cancel</ButtonCancel>
            <ButtonSubmit>Submit</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default FinalItems;
