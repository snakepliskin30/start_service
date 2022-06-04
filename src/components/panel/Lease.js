import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";

import classes from "./Lease.module.css";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";
import useLeaseStore from "../../store/LeaseStore";

function Lease() {
  const ctx = useContext(StartServiceContext);
  const openLease = useAccordionPanelStore((state) => state.openLease);
  const setOpenLease = useAccordionPanelStore((state) => state.setOpenLease);
  const setOpenPaperless = useAccordionPanelStore((state) => state.setOpenPaperless);
  const setOpenDeposit = useAccordionPanelStore((state) => state.setOpenDeposit);

  const leaseIdHold = useLeaseStore((state) => state.leaseIdHold);
  const leaseIncomingNumber = useLeaseStore((state) => state.leaseIncomingNumber);
  const leaseCallbackNumber = useLeaseStore((state) => state.leaseCallbackNumber);
  const leaseReason = useLeaseStore((state) => state.leaseReason);
  const leaseEmail = useLeaseStore((state) => state.leaseEmail);
  const setLeaseIdHold = useLeaseStore((state) => state.setLeaseIdHold);
  const setLeaseIncomingNumber = useLeaseStore((state) => state.setLeaseIncomingNumber);
  const setLeaseCallbackNumber = useLeaseStore((state) => state.setLeaseCallbackNumber);
  const setLeaseReason = useLeaseStore((state) => state.setLeaseReason);
  const setLeaseEmail = useLeaseStore((state) => state.setLeaseEmail);

  // const [incomingPhone, setIncomingPhone] = useState("");
  // const [callbackNum, setCallbackNum] = useState("");
  // const [reason, setReason] = useState("");
  // const [leaseEmailAddress, setLeaseEmailAddress] = useState("");

  const leaseNext = () => {
    setOpenLease(false);
    setOpenPaperless(true);
  };

  const leasePrevious = () => {
    setOpenLease(false);
    setOpenDeposit(true);
  };
  return (
    <Accordion title="Lease" id="lease" open={openLease} setOpen={setOpenLease}>
      <div className={classes.main}>
        <div className={classes.lease_info}>
          <div className={`checkbox`}>
            <input
              type="checkbox"
              id="leaseHold"
              name="leaseHold"
              value={leaseIdHold}
              onChange={(e) => {
                setLeaseIdHold(e.target.checked);
              }}
            />
            <label htmlFor="leaseHold">Lease/ID Hold</label>
          </div>
        </div>

        <div className={classes.leaseForm}>
          <InputNumber label="Incoming Phone Number" id="incomingPhoneNumber" options={{ blocks: [3, 3, 4], delimiter: "-" }} value={leaseIncomingNumber} onChange={setLeaseIncomingNumber} />
          <InputNumber label="Callback Number" id="callbackNumber" options={{ blocks: [3, 3, 4], delimiter: "-" }} value={leaseCallbackNumber} onChange={setLeaseCallbackNumber} />
          <Input label="Reason for Verification" id="depositAmount" value={leaseReason} onChange={setLeaseReason} />
        </div>
        <div className={classes.leaseForm}>
          <Input label="Email Address" id="leaseEmailAddress" value={leaseEmail} onChange={setLeaseEmail} />
          <ButtonCancel>SEND EMAIL</ButtonCancel>
          <div></div>
        </div>

        <div className={classes.lease_btn}>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel onClick={leasePrevious}>Previous</ButtonCancel>
            <ButtonSubmit onClick={leaseNext}>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default React.memo(Lease);
