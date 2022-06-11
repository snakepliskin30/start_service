import { useState } from "react";

const useAddUpdateCustomer = () => {
  const [customerInfoLoad, setCustomerInfoLoad] = useState(false);

  const addUpdateCustomer = async ({
    title,
    firstName,
    middleName,
    lastName,
    suffix,
    ssn,
    primaryPhone,
    altPhone,
    dob,
    ssnNotProvided,
    email,
    driversLicense,
    driversLicenseState,
    emailNotProvided,
    otherInfo,
    comments,
    fullName,
    profileId,
    token,
    interfaceUrl,
    userId,
  }) => {
    try {
      setCustomerInfoLoad(true);

      const Request = {};
      const Payload = {};

      const CreateCustomerRequest = {
        contactType: "I",
        prefix: title,
        firstName: firstName.toUpperCase(),
        middleName: middleName.toUpperCase(),
        lastName: lastName.toUpperCase(),
        suffix: suffix,
        fullName: fullName,
        primaryContact: { phone: primaryPhone.replace(/-/g, "") },
        secondaryContact: { phone: altPhone.replace(/-/g, "") },
        email,
        ssn: ssn.replace(/-/g, ""),
        ssnNotProvidedFlag: ssnNotProvided.toString(),
        driversLicense: {
          number: driversLicense,
          state: driversLicenseState,
          birthday: dob,
        },
        customerNumber: "0",
        memo: `OSvC: ${comments}, ${process.env.REACT_APP_OSVC_USER_ID}, ${process.env.REACT_APP_OSVC_USER_PHONE}`,
        otherCustomerInfo: otherInfo,
      };
      const BaseRequest = {
        transactionId: "1234567890",
        userId: process.env.NODE_ENV === "production" ? userId : process.env.REACT_APP_OSVC_USER_ID,
      };

      Payload.BaseRequest = BaseRequest;
      Payload.CreateCustomerRequest = CreateCustomerRequest;

      Request.Payload = Payload;

      const requestString = JSON.stringify(Request);
      const url = process.env.NODE_ENV === "production" ? `${interfaceUrl}/php/custom/socoapicalls.php` : process.env.REACT_APP_DEV_URL;
      const formData = new FormData();
      formData.append("data", requestString);
      formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_CREATE_CUSTOMER");

      console.log("url", url);

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
      setCustomerInfoLoad(false);
      return data;
    } catch (err) {
      setCustomerInfoLoad(false);
    }
  };

  return { customerInfoLoad, addUpdateCustomer };
};

export default useAddUpdateCustomer;
