import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import InputSelect from "../ui/InputSelect";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./MailingAddress.module.css";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";
import useMailingStore from "../../store/MailingStore";

import { stateOptions } from "../../lov/options";

function MailingAddress() {
  const ctx = useContext(StartServiceContext);
  const openMailingAddress = useAccordionPanelStore((state) => state.openMailingAddress);
  const setOpenMailingAddress = useAccordionPanelStore((state) => state.setOpenMailingAddress);
  const setOpenRateOptions = useAccordionPanelStore((state) => state.setOpenRateOptions);
  const setOpenPaperless = useAccordionPanelStore((state) => state.setOpenPaperless);

  const mailingSameAsPremiseFlag = useMailingStore((state) => state.mailingSameAsPremiseFlag);
  const mailingAddressLine1 = useMailingStore((state) => state.mailingAddressLine1);
  const mailingAddressLine2 = useMailingStore((state) => state.mailingAddressLine2);
  const mailingCity = useMailingStore((state) => state.mailingCity);
  const mailingState = useMailingStore((state) => state.mailingState);
  const mailingZip = useMailingStore((state) => state.mailingZip);
  const setMailingSameAsPremiseFlag = useMailingStore((state) => state.setMailingSameAsPremiseFlag);
  const setMailingAddressLine1 = useMailingStore((state) => state.setMailingAddressLine1);
  const setMailingAddressLine2 = useMailingStore((state) => state.setMailingAddressLine2);
  const setMailingCity = useMailingStore((state) => state.setMailingCity);
  const setMailingState = useMailingStore((state) => state.setMailingState);
  const setMailingZip = useMailingStore((state) => state.setMailingZip);

  // const [addressLine1, setAddressLine1] = useState("");
  // const [addressLine2, setAddressLine2] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [zip, setZip] = useState("");

  const mailingNext = () => {
    setOpenMailingAddress(false);
    setOpenRateOptions(true);
  };

  const mailingPrevious = () => {
    setOpenMailingAddress(false);
    setOpenPaperless(true);
  };
  return (
    <Accordion title="Mailing Address" id="mailingAddress" open={openMailingAddress} setOpen={setOpenMailingAddress}>
      <div className={classes.main}>
        <div className={classes.mailing_info}>
          <div className={`checkbox`}>
            <input
              type="checkbox"
              id="sameAsPremise"
              name="sameAsPremise"
              value={mailingSameAsPremiseFlag}
              onChange={(e) => {
                setMailingSameAsPremiseFlag(e.target.checked);
              }}
            />
            <label htmlFor="sameAsPremise">Same as Premise Address</label>
          </div>
        </div>

        <div className={classes.mailingForm}>
          <Input label="Address Line 1" id="mailingAddressLine1" value={mailingAddressLine1} onChange={setMailingAddressLine1} />
          <Input label="Address Line 2" id="mailingAddressLine2" value={mailingAddressLine2} onChange={setMailingAddressLine2} />
        </div>
        <div className={classes.mailingForm}>
          <div className={classes.mailingForm}>
            <Input label="City" id="mailingCity" value={mailingCity} onChange={setMailingCity} />
            <InputSelect label="State" id="mailingState" value={mailingState} onChange={setMailingState} options={stateOptions} />
            <InputNumber label="Zip" id="mailingZip" options={{ blocks: [5] }} value={mailingZip} onChange={setMailingZip} />
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

export default React.memo(MailingAddress);
