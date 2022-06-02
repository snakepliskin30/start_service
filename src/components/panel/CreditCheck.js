import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Section from "../layout/Section";
import Field from "../ui/Field";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./CreditCheck.module.css";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";

function CreditCheck() {
  const ctx = useContext(StartServiceContext);
  const openCreditCheck = useAccordionPanelStore(
    (state) => state.openCreditCheck
  );
  const setOpenCreditCheck = useAccordionPanelStore(
    (state) => state.setOpenCreditCheck
  );
  const setOpenDeposit = useAccordionPanelStore(
    (state) => state.setOpenDeposit
  );
  const setOpenCustomerInfo = useAccordionPanelStore(
    (state) => state.setOpenCustomerInfo
  );
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const runCreditHandler = () => {};

  const creditNext = () => {
    setOpenCreditCheck(false);
    setOpenDeposit(true);
  };

  const creditPrevious = () => {
    setOpenCreditCheck(false);
    setOpenCustomerInfo(true);
  };
  return (
    <Accordion
      title="Credit Assessment"
      id="creditAssessment"
      open={openCreditCheck}
      setOpen={setOpenCreditCheck}
    >
      <div className={classes.main}>
        <div className={classes.credit_info}>
          <Field label="Decision" value="Pass"></Field>
          <Field label="Decision Date" value="0001-01-01"></Field>
        </div>

        <Section title="Credit Assessment" open={true} noBtn>
          <form className={classes.creditForm} onSubmit={runCreditHandler}>
            <Input
              label="Street Number"
              id="streetNumber"
              value={streetNumber}
              onChange={setStreetNumber}
            />
            <Input
              label="Street Name"
              id="streetName"
              value={streetName}
              onChange={setStreetName}
            />
            <Input label="City" id="city" value={city} onChange={setCity} />
            <Input label="State" id="state" value={state} onChange={setState} />
            <InputNumber
              label="Zip"
              id="zip"
              options={{ blocks: [5] }}
              value={zip}
              onChange={setZip}
            />
            <div className="btnGrp">
              <ButtonCancel type="Submit">Run Credit</ButtonCancel>
            </div>
          </form>
        </Section>

        <div className={classes.credit_btn}>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel onClick={creditPrevious}>Previous</ButtonCancel>
            <ButtonSubmit onClick={creditNext}>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default CreditCheck;
