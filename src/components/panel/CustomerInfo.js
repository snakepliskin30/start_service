import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import InputDatePicker from "../ui/InputDatePicker";
import TextArea from "../ui/TextArea";
import ButtonSubmit from "../ui/ButtonSubmit";
import ButtonCancel from "../ui/ButtonCancel";
import Spinner from "../ui/Spinner";

import classes from "./CustomerInfo.module.css";

import useAddUpdateCustomer from "../../hooks/useAddUpdateCustomer";

import StartServiceContext from "../../store/StartServiceContext";

const CustomerInfo = () => {
  const ctx = useContext(StartServiceContext);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [ssn, setSSN] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [dob, setDob] = useState("");
  const [ssnNotProvided, setSSNNotProvided] = useState(false);
  const [email, setEmail] = useState("");
  const [driversLicense, setDriversLicense] = useState("");
  const [driversLicenseState, setDriversLicenseState] = useState("");
  const [emailNotProvided, setEmailNotProvided] = useState(false);
  const [otherInfo, setOtherInfo] = useState("");
  const [comments, setComments] = useState("");

  const { customerInfoLoad, addUpdateCustomer } = useAddUpdateCustomer();

  const getFullName = () => {
    let fullName = title ? `${title} ` : "";
    fullName += firstName ? `${firstName} ` : "";
    fullName += middleName ? `${middleName} ` : "";
    fullName += lastName ? `${lastName} ` : "";
    fullName += suffix ? `${suffix}` : "";
    return fullName;
  };

  const customerInfoHandler = async (e) => {
    e.preventDefault();
    console.log("dob", dob);
    const custInfo = {
      title,
      firstName,
      middleName,
      lastName,
      suffix,
      ssn,
      primaryPhone,
      altPhone,
      // eslint-disable-next-line no-undef
      dob: dob ? moment(dob, "MM/DD/YYYY").format("YYYY-MM-DD") : "0001-01-01",
      ssnNotProvided,
      email,
      driversLicense,
      driversLicenseState,
      emailNotProvided,
      otherInfo,
      comments,
      fullName: getFullName(),
    };
    addUpdateCustomer(custInfo);
  };

  const custInfoNext = () => {
    console.log("test");
    ctx.setOpenCustomerInfo(false);
    ctx.setOpenCreditCheck(true);
  };

  const custInfoPrevious = () => {
    ctx.setOpenCustomerInfo(false);
    ctx.setOpenPremise(true);
  };

  return (
    <Accordion title="Customer Information" id="custInfo" open={ctx.openCustomerInfo} setOpen={ctx.setOpenCustomerInfo}>
      {/* {customerInfoLoad && <Spinner />} */}
      <form onSubmit={customerInfoHandler}>
        <div className={classes.main}>
          <div className={classes.item_a}>
            <Input label="Title" id="title" value={title} onChange={setTitle} />
          </div>
          <div className={classes.item_b}>
            <Input label="First Name" id="firstName" required={true} value={firstName} onChange={setFirstName} />
          </div>
          <div className={classes.item_c}>
            <Input label="Middle Name" id="middleName" value={middleName} onChange={setMiddleName} />
          </div>
          <div className={classes.item_d}>
            <Input label="Last Name" id="lastName" required={true} value={lastName} onChange={setLastName} />
          </div>
          <div className={classes.item_e}>
            <Input label="Suffix" id="suffix" value={suffix} onChange={setSuffix} />
          </div>
          <div className={classes.item_x}>
            <ButtonCancel>Copy</ButtonCancel>
          </div>
          <div className={classes.item_f}>
            <InputNumber label="SSN/TIN" id="ssntin" options={{ blocks: [3, 2, 3], delimiter: "-" }} required={true} value={ssn} onChange={setSSN} />
          </div>
          <div className={classes.item_g}>
            <InputNumber label="Primary Phone" id="primaryPhone" options={{ blocks: [3, 3, 4], delimiter: "-" }} required={true} value={primaryPhone} onChange={setPrimaryPhone} />
          </div>
          <div className={classes.item_h}>
            <InputNumber label="Alternate Phone" id="altPhone" options={{ blocks: [3, 3, 4], delimiter: "-" }} value={altPhone} onChange={setAltPhone} />
          </div>
          <div className={classes.item_i}>
            <InputDatePicker
              label="Date Of Birth"
              id="dob"
              onChange={(date) => {
                setDob(date);
              }}
              value={dob}
            />
          </div>
          <div className={`${classes.item_j} checkbox`}>
            <input
              type="checkbox"
              id="ssnnotprovided"
              name="ssnnotprovided"
              value={ssnNotProvided}
              onChange={(e) => {
                setSSNNotProvided(e.target.checked);
              }}
            />
            <label htmlFor="ssnnotprovided">SSN/TIN not provided</label>
          </div>
          <div className={classes.item_k}>
            <Input label="Email Address" id="email" required={true} value={email} onChange={setEmail} />
          </div>
          <div className={classes.item_l}>
            <InputNumber label="Driver's License Number" id="driverslicense" options={{ blocks: [15] }} value={driversLicense} onChange={setDriversLicense} />
          </div>
          <div className={classes.item_m}>
            <Input label="State" id="state" required={true} value={driversLicenseState} onChange={setDriversLicenseState} />
          </div>
          <div className={`${classes.item_n} checkbox`}>
            <input
              type="checkbox"
              id="emailnotprovided"
              name="emailnotprovided"
              value={emailNotProvided}
              onChange={(e) => {
                setEmailNotProvided(e.target.checked);
              }}
            />
            <label htmlFor="emailnotprovided">Email address not provided</label>
          </div>
          <div className={classes.item_o}>
            <TextArea label="Other Customer Information" id="otherInfo" required={true} value={otherInfo} onChange={setOtherInfo} />
          </div>
          <div className={classes.item_p}>
            <TextArea label="Comments" id="comments" required={true} value={comments} onChange={setComments} />
          </div>
          <div className={`${classes.item_q} btnGrp`}>
            <ButtonCancel type="Submit">Add Customer</ButtonCancel>
          </div>
          <div className={`${classes.item_r} btnGrp`}>
            <ButtonCancel onClick={custInfoPrevious}>Previous</ButtonCancel>
            <ButtonSubmit onClick={custInfoNext}>Next</ButtonSubmit>
          </div>
        </div>
      </form>
    </Accordion>
  );
};

export default CustomerInfo;
