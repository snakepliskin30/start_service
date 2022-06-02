import React, { useContext, useEffect, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./Paperless.module.css";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";

import {
  paperlessActionOptions,
  paperlessDaysBeforeDueDateOptions,
} from "../../lov/options";
import InputSelect from "../ui/InputSelect";

function Paperless() {
  const ctx = useContext(StartServiceContext);
  const openPaperless = useAccordionPanelStore((state) => state.openPaperless);
  const setOpenPaperless = useAccordionPanelStore(
    (state) => state.setOpenPaperless
  );
  const setOpenMailingAddress = useAccordionPanelStore(
    (state) => state.setOpenMailingAddress
  );
  const setOpenLease = useAccordionPanelStore((state) => state.setOpenLease);
  const [paperlessAction, setPaperlessAction] = useState("");
  const [paperlessEmail, setPaperlessEmail] = useState("");
  const [daysBeforeDue, setDaysBeforeDue] = useState("");
  const [emailRequired, setEmailRequired] = useState(false);
  const [paperlessActionValidation, setPaperlessActionValidation] = useState({
    error: "",
  });
  const [paperlessEmailValidation, setPaperlessEmailValidation] = useState({
    error: "",
  });
  const runCreditHandler = () => {};

  const paperlessNext = () => {
    if (validate()) {
      setOpenPaperless(false);
      setOpenMailingAddress(true);
    }
  };

  const paperlessPrevious = () => {
    setOpenPaperless(false);
    setOpenLease(true);
  };

  const validate = () => {
    let valid = true;
    console.log("paperless action is", paperlessAction);
    if (!paperlessAction) {
      valid = false;
      setPaperlessActionValidation({ error: "Paperless Action is required" });
      setPaperlessEmailValidation({ error: "" });
    } else {
      if (
        (paperlessAction === "Enroll in Paperless" ||
          paperlessAction === "Send Paperless Info") &&
        !paperlessEmail
      ) {
        valid = false;
        setPaperlessEmailValidation({ error: "Email Address is required" });
      } else {
        setPaperlessEmailValidation({ error: "" });
      }
      setPaperlessActionValidation({ error: "" });
    }
    return valid;
  };

  useEffect(() => {
    if (
      paperlessAction === "Enroll in Paperless" ||
      paperlessAction === "Send Paperless Info"
    )
      setEmailRequired(true);
    else {
      setEmailRequired(false);
      setPaperlessEmailValidation({ error: "" });
    }
  }, [paperlessAction]);

  return (
    <Accordion
      title="Paperless Billing"
      id="paperlessBilling"
      open={openPaperless}
      setOpen={setOpenPaperless}
    >
      <div className={classes.main}>
        <div className={classes.paperlessForm}>
          <InputSelect
            label="Paperless Action"
            id="paperlessAction"
            value={paperlessAction}
            onChange={setPaperlessAction}
            required={true}
            error={paperlessActionValidation.error}
            options={paperlessActionOptions}
          />
          <Input
            label="Email Address"
            id="paperlessEmailAddress"
            value={paperlessEmail}
            onChange={setPaperlessEmail}
            required={emailRequired}
            error={paperlessEmailValidation.error}
          />
          <Input
            label="Days Before Due Date"
            id="paperlessDaysBeforeDue"
            value={daysBeforeDue}
            onChange={setDaysBeforeDue}
          />
        </div>
        <div
          className={classes.paperless_info}
          style={{ justifyContent: "center" }}
        >
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
