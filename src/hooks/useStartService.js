import { useState } from "react";

const buildRequestPayload = (premiseInfo, customerInfo, depositInfo, leaseInfo, paperlessInfo, mailingInfo, rateInfo, dateWanted, userId) => {
  const Request = {};
  const Payload = {};
  const BaseRequest = {};
  const ConnectService = {};

  BaseRequest = {
    transactionId: "1234567890",
    transactionType: "Existing",
    userId: process.env.NODE_ENV === "production" ? userId : process.env.REACT_APP_OSVC_USER_ID,
  };

  ConnectService = {
    connectionEffectiveDate: dateWanted,
    Account: {
      PrimaryContact: {
        firstName: customerInfo.firstName,
        middleInitial: customerInfo.middleName ? customerInfo.middleName[0].toUpperCase() : "",
        lastName: customerInfo.lastName,
        primaryContactPhone: customerInfo.primaryPhone,
        secondaryContactPhone: customerInfo.altPhone,
        email: customerInfo.email,
        Address: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
        },
      },
      ServiceAddress: {
        addressCompressed: premiseInfo.fullAddress,
      },
      customerNo: customerInfo.customerNo,
      companyCode: premiseInfo.companyCode,
      premiseNo: premiseInfo.premiseNo,
      ServicePoint: {
        tariffScheduleCode: premiseInfo.tariffSchedCode,
        servicePointNumber: premiseInfo.servicePointNumber,
        Meters: {
          meterNo: premiseInfo.meterNumber,
          meterPointLocationCode: premiseInfo.meterPointLocationCode,
        },
      },
    },
    Deposit: {
      depositActionCode: depositInfo.depositAction,
      depositComment: `OSvC: ${customerInfo.firstName} ${customerInfo.middleName ? customerInfo.middleName[0].toUpperCase() : ""} ${
        customerInfo.lastName
      }, No Credit Information, Waived, ${userId}, 123456`,
      depositAmount: depositInfo.depositAmount,
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
      paperlessIndicatorCode: paperlessInfo.paperlessAction,
      leaseObligationCode: leaseInfo.leaseIdHold ? "Y" : "N",
      leaseComment: "",
      reminderFlag: paperlessInfo.paperlessReminderEmail,
      reminderDays: paperlessInfo.paperlessDaysBeforeDue,
      validateEmailFlag: true,
      enrollBudgetBillFlag: "false",
      addRiderContractFlag: "false",
      holdWorkOrderFlag: "false",
    },
    memo: "OSvC: PEDRO NUNEZ, connect, 06/03/2022, No Deposit, x2rgdeza@developer2, 123456",
  };

  Payload.BaseRequest = BaseRequest;
  Payload.ConnectService = ConnectService;
  Request.Payload = Payload;

  return Request;
};

const useStartService = () => {
  const [startServiceLoad, setStartServiceLoad] = useState(false);
  const startServiceRequest = async (
    premiseInfo,
    customerInfo,
    depositInfo,
    leaseInfo,
    paperlessInfo,
    mailingInfo,
    rateInfo,
    dateWanted,
    profileId,
    token,
    interfaceUrl,
    userId
  ) => {
    setStartServiceLoad(true);
    const Request = buildRequestPayload(premiseInfo, customerInfo, depositInfo, leaseInfo, paperlessInfo, mailingInfo, rateInfo, dateWanted, userId);
    const requestString = JSON.stringify(Request);
    const url = process.env.NODE_ENV === "production" ? `${interfaceUrl}/php/custom/socoapicalls.php` : process.env.REACT_APP_DEV_URL;
    const formData = new FormData();
    formData.append("data", requestString);
    formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_CONNECT_SERVICE");

    const response = await fetch(url, {
      method: "post",
      credentials: "same-origin",
      headers: {
        P_SID: token,
        P_ID: profileId,
      },
      body: formData,
    });

    const data = await response.json();
    setStartServiceLoad(false);
    return data;
  };
  return { startServiceLoad, startServiceRequest };
};

export default useStartService;
