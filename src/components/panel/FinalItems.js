import React, { useContext, useState } from "react";
import useStartService from "../../hooks/useStartService";
import Accordion from "../layout/Accordion";
import InputDatePicker from "../ui/InputDatePicker";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonSubmit from "../ui/ButtonSubmit";
import Spinner from "../ui/Spinner";

import classes from "./FinalItems.module.css";

import StartServiceContext from "../../store/StartServiceContext";
import useAccordionPanelStore from "../../store/AccordionPanelStore";
import usePremiseInfoStore from "../../store/PremiseInfoStore";
import useCustomerInfoStore from "../../store/CustomerInfoStore";
import useDepositStore from "../../store/DepositStore";
import useLeaseStore from "../../store/LeaseStore";
import usePaperlessStore from "../../store/PaperlessStore";
import useMailingStore from "../../store/MailingStore";
import useRateStore from "../../store/RateStore";
import useStartServiceStore from "../../store/StartServiceStore";

function FinalItems() {
  const { startServiceLoad, startServiceRequest } = useStartService();
  const ctx = useContext(StartServiceContext);
  const profileId = ctx.osvcProfileId;
  const token = ctx.osvcSessionToken;
  const interfaceUrl = ctx.osvcInterfaceUrl;
  const userId = ctx.osvcLoginName;
  const userPhone = ctx.osvcLoginPhone;
  const acctNumber = ctx.acctNumber;

  const openFinalItems = useAccordionPanelStore((state) => state.openFinalItems);
  const setOpenFinalItems = useAccordionPanelStore((state) => state.setOpenFinalItems);
  const setOpenRateOptions = useAccordionPanelStore((state) => state.setOpenRateOptions);

  const setOpenPremise = useAccordionPanelStore((state) => state.setOpenPremise);
  const setOpenCustomerInfo = useAccordionPanelStore((state) => state.setOpenCustomerInfo);
  const setOpenCreditCheck = useAccordionPanelStore((state) => state.setOpenCreditCheck);
  const setOpenDeposit = useAccordionPanelStore((state) => state.setOpenDeposit);
  const setOpenLease = useAccordionPanelStore((state) => state.setOpenLease);
  const setOpenPaperless = useAccordionPanelStore((state) => state.setOpenPaperless);
  const setOpenMailingAddress = useAccordionPanelStore((state) => state.setOpenMailingAddress);
  const [dateWanted, setDateWanted] = useState("");

  const ctxPremise = usePremiseInfoStore((state) => state);
  const ctxCustomer = useCustomerInfoStore((state) => state);
  const ctxDeposit = useDepositStore((state) => state);
  const ctxLease = useLeaseStore((state) => state);
  const ctxPaperless = usePaperlessStore((state) => state);
  const ctxMailing = useMailingStore((state) => state);
  const ctxRate = useRateStore((state) => state);
  const setStartAccountNumber = useStartServiceStore((state) => state.setStartAccountNumber);

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

  const buildRequest = () => {
    const userLogin = process.env.NODE_ENV === "production" ? userId : process.env.REACT_APP_OSVC_USER_ID;
    const userLoginPhone = process.env.NODE_ENV === "production" ? userPhone : process.env.REACT_APP_OSVC_USER_PHONE;
    const decisionCode = ""; // comes from credit check
    const fullName = `${ctxCustomer.customerInfo.firstName} ${ctxCustomer.customerInfo.middleName} ${ctxCustomer.customerInfo.lastName}`.replace(/\s+/g, " ").trim();
    let paperlessActionCode = "";
    switch (ctxPaperless.paperlessAction) {
      case "Enroll in Paperless":
        paperlessActionCode = "01";
        break;
      case "Send Paperless Info":
        paperlessActionCode = "04";
        break;
      case "Not Interested in Paperless":
        paperlessActionCode = "05";
        break;
      default:
        break;
    }
    let depositActionCode = "";
    let depositComment = "";
    let depositAmount = "";
    let depositActionPhrase = "";
    switch (ctxDeposit.depositAction) {
      case "Quote Deposit":
        depositActionCode = "5";
        depositComment = `OSvC: ${fullName}, ${ctxCustomer.customerInfo.ssn.slice(-4)}, ${decisionCode}, $${ctxDeposit.depositAmount}, ${userLogin}, ${userLoginPhone}`;
        depositAmount = ctxDeposit.depositAmount;
        depositActionPhrase = `$${ctxDeposit.depositAmount}, `;
        break;
      case "Waive Deposit":
        depositActionCode = "1";
        depositComment = "";
        depositAmount = "0";
        depositActionPhrase = "No Deposit, ";
        break;
      case "Transfer Deposit":
        depositActionCode = "4";
        depositComment = "";
        depositAmount = ctxDeposit.depositAmount;
        break;
      default:
        depositAmount = "0";
        break;
    }

    let Request = {};
    let Payload = {};
    let BaseRequest = {};
    let ConnectService = {};

    BaseRequest = {
      transactionId: "1234567890",
      transactionType: "New",
      userId: process.env.NODE_ENV === "production" ? userId : process.env.REACT_APP_OSVC_USER_ID,
    };
    ConnectService = {
      // eslint-disable-next-line no-undef
      connectionEffectiveDate: moment(dateWanted, "MM/DD/YYYY").format("YYYY-MM-DD"),
      Account: {
        PrimaryContact: {
          firstName: ctxCustomer.customerInfo.firstName,
          middleInitial: ctxCustomer.customerInfo.middleName ? ctxCustomer.customerInfo.middleName[0].toUpperCase() : "",
          lastName: ctxCustomer.customerInfo.lastName,
          primaryContactPhone: ctxCustomer.customerInfo.primaryPhone.replace(/-/g, ""),
          secondaryContactPhone: ctxCustomer.customerInfo.altPhone.replace(/-/g, ""),
          email: ctxCustomer.customerInfo.email,
          Address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zip: "",
          },
        },
        ServiceAddress: {
          addressCompressed: ctxPremise.selectedPremiseInfo.fullAddress,
        },
        customerNo: ctxCustomer.customerInfo.customerNo,
        companyCode: ctxPremise.selectedPremiseInfo.companyCode,
        premiseNo: ctxPremise.selectedPremiseInfo.premiseNo,
        ServicePoint: {
          tariffScheduleCode: ctxPremise.selectedPremiseInfo.tariffSchedCode,
          servicePointNumber: ctxPremise.selectedPremiseInfo.servicePointNumber,
          Meters: {
            meterNo: ctxPremise.selectedPremiseInfo.meterNumber,
            meterPointLocationCode: ctxPremise.selectedPremiseInfo.meterPointLocationCode,
          },
        },
      },
      Deposit: {
        depositActionCode: depositActionCode,
        depositComment: depositComment,
        depositAmount: depositAmount,
      },
      // TransferServiceData: {
      // 	UnpaidAccounts: [
      // 		{
      // 			accountNo: "2181852006",
      // 			unpaidAmount: "1.25",
      // 			unpaidBillComment: "OSvC: PEDRO NUNEZ, 4321, 21818-52006, $1.25, x2rgdeza@developer2, 123456"
      // 		}
      // 	]
      // },
      ConnectionOrderFlags: {
        paperlessIndicatorCode: paperlessActionCode,
        leaseObligationCode: ctxLease.leaseIdHold ? "Y" : "N",
        leaseComment: "",
        reminderFlag: ctxPaperless.paperlessReminderEmail ? true : false,
        reminderDays: ctxPaperless.paperlessDaysBeforeDue ? ctxPaperless.paperlessDaysBeforeDue : "0",
        validateEmailFlag: false,
        enrollBudgetBillFlag: "false",
        addRiderContractFlag: "false",
        holdWorkOrderFlag: "false",
      },
      memo: `OSvC: ${fullName}, connect, ${dateWanted}, ${ctxDeposit.depositAction}, ${userLogin}, ${userLoginPhone}`,
    };

    Payload.BaseRequest = BaseRequest;
    Payload.ConnectService = ConnectService;
    Request.Payload = Payload;

    return Request;
  };

  const callStartService = async (e) => {
    e.preventDefault();
    console.log(ctxPremise);
    console.log(ctxCustomer);
    console.log(ctxDeposit);
    console.log(ctxLease);
    console.log(ctxPaperless);
    console.log(ctxMailing);
    console.log(ctxRate);
    const request = buildRequest();
    const requestString = JSON.stringify(request);
    const response = await startServiceRequest(requestString, profileId, token, interfaceUrl, userId);
    if (response.Result.status.toLowerCase() === "ok") {
      setStartAccountNumber(response.Payload.ConnectService.accountNo);
    }
    console.log(response);
  };
  return (
    <Accordion title="Final Items" id="finalItems" open={openFinalItems} setOpen={setOpenFinalItems}>
      {startServiceLoad && <Spinner />}
      <form className={classes.main} onSubmit={callStartService}>
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
            <ButtonSubmit type="Submit">Submit</ButtonSubmit>
          </div>
        </div>
      </form>
    </Accordion>
  );
}

export default React.memo(FinalItems);
