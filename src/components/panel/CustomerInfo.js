import React, { useContext, useState } from "react";
import Accordion from "../layout/Accordion";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import InputDatePicker from "../ui/InputDatePicker";
import InputSelect from "../ui/InputSelect";
import TextArea from "../ui/TextArea";
import ButtonSubmit from "../ui/ButtonSubmit";
import ButtonCancel from "../ui/ButtonCancel";
import Spinner from "../ui/Spinner";

import classes from "./CustomerInfo.module.css";

import useAddUpdateCustomer from "../../hooks/useAddUpdateCustomer";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";
import useCustomerInfoStore from "../../store/CustomerInfoStore";
import useModalStore from "../../store/ModalStore";

import { titleOptions, suffixOptions, stateOptions } from "../../lov/options";

const CustomerInfo = () => {
  const ctx = useContext(StartServiceContext);
  const openCustomerInfo = useAccordionPanelStore((state) => state.openCustomerInfo);
  const setOpenPremise = useAccordionPanelStore((state) => state.setOpenPremise);
  const setOpenCustomerInfo = useAccordionPanelStore((state) => state.setOpenCustomerInfo);
  const setOpenCreditCheck = useAccordionPanelStore((state) => state.setOpenCreditCheck);
  const setCustomerInfo = useCustomerInfoStore((state) => state.setCustomerInfo);
  const setShowModal = useModalStore((state) => state.setShowModal);
  const setModalYLoc = useModalStore((state) => state.setModalYLoc);

  const [customerNo, setCustomerNo] = useState("");
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
  const [firstNameValidation, setFirstNameValidation] = useState({ error: "" });
  const [lastNameValidation, setLastNameValidation] = useState({ error: "" });
  const [ssnValidation, setSSNValidation] = useState({ error: "" });
  const [primaryPhoneValidation, setPrimaryPhoneValidation] = useState({
    error: "",
  });
  const [emailValidation, setEmailValidation] = useState({ error: "" });
  const [stateValidation, setStateValidation] = useState({ error: "" });
  const [otherInfoValidation, setOtherInfoValidation] = useState({ error: "" });
  const [commentValidation, setCommentValidation] = useState({ error: "" });
  const [invokedAddUpdateCustomer, setInvokeAddUpdateCustomer] = useState(false);

  const { customerInfoLoad, addUpdateCustomer } = useAddUpdateCustomer();

  const getFullName = () => {
    let fullName = `${title} ${firstName} ${middleName} ${lastName} ${suffix}`;
    return fullName.replace(/\s+/g, " ").trim();
  };

  const validateForm = () => {
    let isValid = true;
    if (!firstName) {
      isValid = false;
      setLastNameValidation({ error: "First Name is required" });
    } else setLastNameValidation({ error: "" });

    if (!lastName) {
      isValid = false;
      setLastNameValidation({ error: "Last Name is required" });
    } else setFirstNameValidation({ error: "" });

    if (!ssn) {
      isValid = false;
      setSSNValidation({ error: "SSN is required" });
    } else {
      if (ssn?.replace(/-/g, "").length !== 9) {
        isValid = false;
        setSSNValidation({ error: "SSN format is ***-**-****" });
      } else setSSNValidation({ error: "" });
    }

    if (!primaryPhone) {
      isValid = false;
      setPrimaryPhoneValidation({ error: "Primary Phone is required" });
    } else {
      if (primaryPhone?.replace(/-/g, "").length !== 10) {
        isValid = false;
        setPrimaryPhoneValidation({
          error: "Primary Phone format is ***-***-****",
        });
      } else setPrimaryPhoneValidation({ error: "" });
    }

    if (!email) {
      isValid = false;
      setEmailValidation({ error: "Email Address is required" });
    } else {
      const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(emailFormat)) {
        setEmailValidation({ error: "" });
      } else {
        isValid = false;
        setEmailValidation({ error: "Please use a valid email address" });
      }
    }

    if (driversLicense && !driversLicenseState) {
      isValid = false;
      setStateValidation({ error: "Driver's License State is required" });
    } else {
      setStateValidation({ error: "" });
    }

    if (!otherInfo) {
      isValid = false;
      setOtherInfoValidation({ error: "Other Info is required" });
    } else setOtherInfoValidation({ error: "" });

    if (!comments) {
      isValid = false;
      setCommentValidation({ error: "Comments are required" });
    } else setCommentValidation({ error: "" });

    return isValid;
  };

  const customerInfoHandler = async (e) => {
    e.preventDefault();

    const profileId = ctx.osvcProfileId;
    const token = ctx.osvcSessionToken;
    const interfaceUrl = ctx.osvcInterfaceUrl;
    const userId = ctx.osvcLoginName;

    if (validateForm()) {
      const custInfo = {
        title,
        firstName,
        middleName,
        lastName,
        suffix,
        ssn,
        primaryPhone,
        altPhone,
        dob: dob
          ? // eslint-disable-next-line no-undef
            moment(dob, "MM/DD/YYYY").format("YYYY-MM-DD")
          : "0001-01-01",
        ssnNotProvided,
        email,
        driversLicense,
        driversLicenseState,
        emailNotProvided,
        otherInfo,
        comments,
        fullName: getFullName(),
        profileId,
        token,
        interfaceUrl,
        userId,
      };
      const data = await addUpdateCustomer(custInfo);
      if (data.Result.status.toLowerCase() === "ok") {
        let custInfo = {
          ssn,
          firstName,
          middleName,
          lastName,
          primaryPhone,
          altPhone,
          email,
          customerNo,
        };
        if (data?.Payload) {
          setCustomerNo(data.Payload.CreateCustomerResponse?.customer?.customerNo);
          custInfo = {
            ...custInfo,
            customerNo: data.Payload.CreateCustomerResponse?.customer?.customerNo,
          };
        }
        setCustomerInfo(custInfo);
        setInvokeAddUpdateCustomer(true);
        setOpenCustomerInfo(false);
        setOpenCreditCheck(true);
      }
    }
  };

  const custInfoNext = (e) => {
    if (!invokedAddUpdateCustomer) {
      const yLoc = e.pageY - 500;
      setModalYLoc(yLoc);
      setShowModal(true);
      return;
    }

    setOpenCustomerInfo(false);
    setOpenCreditCheck(true);
  };

  const custInfoPrevious = () => {
    setOpenCustomerInfo(false);
    setOpenPremise(true);
  };

  return (
    <Accordion title="Customer Information" id="custInfo" open={openCustomerInfo} setOpen={setOpenCustomerInfo}>
      {customerInfoLoad && <Spinner />}
      <form onSubmit={customerInfoHandler}>
        <div className={classes.main}>
          <div className={classes.item_a}>
            <InputSelect
              label="Title"
              id="title"
              value={title}
              onChange={(val) => {
                setTitle(val);
                setInvokeAddUpdateCustomer(false);
              }}
              options={titleOptions}
            />
          </div>
          <div className={classes.item_b}>
            <Input
              label="First Name"
              id="firstName"
              required={true}
              value={firstName}
              onChange={(val) => {
                setFirstName(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={firstNameValidation.error}
            />
          </div>
          <div className={classes.item_c}>
            <Input label="Middle Name" id="middleName" value={middleName} onChange={setMiddleName} />
          </div>
          <div className={classes.item_d}>
            <Input
              label="Last Name"
              id="lastName"
              required={true}
              value={lastName}
              onChange={(val) => {
                setLastName(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={lastNameValidation.error}
            />
          </div>
          <div className={classes.item_e}>
            <InputSelect
              label="Suffix"
              id="suffix"
              value={suffix}
              onChange={(val) => {
                setSuffix(val);
                setInvokeAddUpdateCustomer(false);
              }}
              options={suffixOptions}
            />
          </div>
          <div className={classes.item_x}>
            <ButtonCancel>Copy</ButtonCancel>
          </div>
          <div className={classes.item_f}>
            <InputNumber
              label="SSN/TIN"
              id="ssntin"
              options={{ blocks: [3, 2, 4], delimiter: "-" }}
              required={true}
              value={ssn}
              onChange={(val) => {
                setSSN(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={ssnValidation.error}
            />
          </div>
          <div className={classes.item_g}>
            <InputNumber
              label="Primary Phone"
              id="primaryPhone"
              options={{ blocks: [3, 3, 4], delimiter: "-" }}
              required={true}
              value={primaryPhone}
              onChange={(val) => {
                setPrimaryPhone(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={primaryPhoneValidation.error}
            />
          </div>
          <div className={classes.item_h}>
            <InputNumber
              label="Alternate Phone"
              id="altPhone"
              options={{ blocks: [3, 3, 4], delimiter: "-" }}
              value={altPhone}
              onChange={(val) => {
                setAltPhone(val);
                setInvokeAddUpdateCustomer(false);
              }}
            />
          </div>
          <div className={classes.item_i}>
            <InputDatePicker
              label="Date Of Birth"
              id="dob"
              onChange={(date) => {
                setDob(date);
                setInvokeAddUpdateCustomer(false);
              }}
              value={dob}
              changeYear={true}
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
                setInvokeAddUpdateCustomer(false);
              }}
            />
            <label htmlFor="ssnnotprovided">SSN/TIN not provided</label>
          </div>
          <div className={classes.item_k}>
            <Input
              label="Email Address"
              id="email"
              required={true}
              value={email}
              onChange={(val) => {
                setEmail(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={emailValidation.error}
            />
          </div>
          <div className={classes.item_l}>
            <InputNumber
              label="Driver's License Number"
              id="driverslicense"
              options={{ blocks: [15] }}
              value={driversLicense}
              onChange={(val) => {
                setDriversLicense(val);
                setInvokeAddUpdateCustomer(false);
              }}
            />
          </div>
          <div className={classes.item_m}>
            <InputSelect
              label="State"
              id="state"
              required={true}
              value={driversLicenseState}
              onChange={(val) => {
                setDriversLicenseState(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={stateValidation.error}
              options={stateOptions}
            />
          </div>
          <div className={`${classes.item_n} checkbox`}>
            <input
              type="checkbox"
              id="emailnotprovided"
              name="emailnotprovided"
              value={emailNotProvided}
              onChange={(e) => {
                setEmailNotProvided(e.target.checked);
                setInvokeAddUpdateCustomer(false);
              }}
            />
            <label htmlFor="emailnotprovided">Email address not provided</label>
          </div>
          <div className={classes.item_o}>
            <TextArea
              label="Other Customer Information"
              id="otherInfo"
              required={true}
              value={otherInfo}
              onChange={(val) => {
                setOtherInfo(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={otherInfoValidation.error}
            />
          </div>
          <div className={classes.item_p}>
            <TextArea
              label="Comments"
              id="comments"
              required={true}
              value={comments}
              onChange={(val) => {
                setComments(val);
                setInvokeAddUpdateCustomer(false);
              }}
              error={commentValidation.error}
            />
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

export default React.memo(CustomerInfo);
