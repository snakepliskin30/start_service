import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import InputDatePicker from "../ui/InputDatePicker";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./FinalItems.module.css";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";

function FinalItems() {
  const ctx = useContext(StartServiceContext);
  const openFinalItems = useAccordionPanelStore(
    (state) => state.openFinalItems
  );
  const setOpenFinalItems = useAccordionPanelStore(
    (state) => state.setOpenFinalItems
  );
  const setOpenRateOptions = useAccordionPanelStore(
    (state) => state.setOpenRateOptions
  );

  const setOpenPremise = useAccordionPanelStore(
    (state) => state.setOpenPremise
  );
  const setOpenCustomerInfo = useAccordionPanelStore(
    (state) => state.setOpenCustomerInfo
  );
  const setOpenCreditCheck = useAccordionPanelStore(
    (state) => state.setOpenCreditCheck
  );
  const setOpenDeposit = useAccordionPanelStore(
    (state) => state.setOpenDeposit
  );
  const setOpenLease = useAccordionPanelStore((state) => state.setOpenLease);
  const setOpenPaperless = useAccordionPanelStore(
    (state) => state.setOpenPaperless
  );
  const setOpenMailingAddress = useAccordionPanelStore(
    (state) => state.setOpenMailingAddress
  );
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [dateWanted, setDateWanted] = useState("");
  const runCreditHandler = () => {};

  const openAll = () => {
    setOpenPremise(true);
    setOpenCustomerInfo(true);
    setOpenCreditCheck(true);
    setOpenDeposit(true);
    setOpenLease(true);
    setOpenPaperless(true);
    setOpenMailingAddress(true);
    setOpenRateOptions(true);
    setOpenFinalItems(true);
  };

  const finalItemPrevious = () => {
    setOpenFinalItems(false);
    setOpenRateOptions(true);
  };
  return (
    <Accordion
      title="Final Items"
      id="finalItems"
      open={openFinalItems}
      setOpen={setOpenFinalItems}
    >
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
