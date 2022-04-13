import React, { Fragment, useEffect, useState, useCallback } from "react";
import Accordion from "../layout/Accordion";
import Field from "../ui/Field";
import Section from "../layout/Section";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonSubmit from "../ui/ButtonSubmit";
import ButtonCancel from "../ui/ButtonCancel";
import Spinner from "../ui/Spinner";

//Datatable Modules
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import classes from "./PremiseInfo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PremiseInfo = () => {
  console.log("premiseinfo renders");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("GA");
  const [zip, setZip] = useState("");
  const [apiCallFlag, setApiCallFlag] = useState(false);
  const [premiseResults, setPremiseResults] = useState([]);
  const [premiseDetails, setPremiseDetails] = useState({});
  const [searchFormShow, setSearchFormShow] = useState(true);
  const [searchResultShow, setSearchResultShow] = useState(false);
  const [searchInfoShow, setSearchInfoShow] = useState(false);

  async function searchFormHandler(e) {
    e.preventDefault();
    setApiCallFlag(true);
    setSearchResultShow(false);
    setSearchInfoShow(false);

    const Request = {};
    const Payload = {};

    Payload.formattedAddress = streetName;
    Payload.city = city;
    Payload.state = state;
    Payload.zip = zip;

    Request.Payload = Payload;

    const requestString = JSON.stringify(Request);
    const url = `https://gpcservice--tst1.custhelp.com/cgi-bin/gpcservice.cfg/php/custom/socoapicalls_noauth.php`;
    const formData = new FormData();
    formData.append("data", requestString);
    formData.append("apiUrl", "CUSTOM_CFG_START_SEARCH_PREMISE_URL");

    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });

    const data = await response.json();
    const premiseResults = Array.from(new Set(data.Payload.AddressInfo.map((s) => s.premiseNo))).map((premiseNum) => data.Payload.AddressInfo.find((d) => d.premiseNo === premiseNum));
    setPremiseResults(premiseResults);
    setSearchFormShow(false);
    setSearchResultShow(true);
    setSearchInfoShow(false);
    setApiCallFlag(false);
  }

  async function getPremise(premiseNo) {
    const Request = {};
    const Payload = {};
    const GetPremise = {};
    const BaseRequest = {};

    BaseRequest.transactionId = "12345678";
    BaseRequest.userId = "X2RGDEZA";

    GetPremise.BaseRequest = BaseRequest;
    GetPremise.premiseNo = premiseNo;
    GetPremise.companyCode = "2";

    Payload.GetPremise = GetPremise;

    Request.Payload = Payload;

    const requestString = JSON.stringify(Request);
    const url = `https://gpcservice--tst1.custhelp.com/cgi-bin/gpcservice.cfg/php/custom/socoapicalls_noauth.php`;
    const formData = new FormData();
    formData.append("data", requestString);
    formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_GET_PREMISE");

    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });

    const data = await response.json();
    return data;
  }

  async function getPremiseMeters(premiseNo) {
    const Request = {};
    const Payload = {};
    const GetPremiseMeters = {};
    const BaseRequest = {};

    BaseRequest.transactionId = "12345678";
    BaseRequest.userId = "X2RGDEZA";

    GetPremiseMeters.premiseNo = premiseNo;

    Payload.BaseRequest = BaseRequest;
    Payload.GetPremiseMeters = GetPremiseMeters;

    Request.Payload = Payload;

    const requestString = JSON.stringify(Request);
    const url = `https://gpcservice--tst1.custhelp.com/cgi-bin/gpcservice.cfg/php/custom/socoapicalls_noauth.php`;
    const formData = new FormData();
    formData.append("data", requestString);
    formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_GET_PREMISE_METERS");

    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });

    const data = await response.json();
    return data;
  }

  async function getPremiseFlatBill(premiseNo) {
    const Request = {};
    const Payload = {};
    const GetFlatBillStatus = {};
    const BaseRequest = {};

    BaseRequest.transactionId = "12345678";
    BaseRequest.userId = "X2RGDEZA";

    GetFlatBillStatus.BaseRequest = BaseRequest;
    GetFlatBillStatus.premiseNo = premiseNo;

    Payload.GetFlatBillStatus = GetFlatBillStatus;

    Request.Payload = Payload;

    const requestString = JSON.stringify(Request);
    const url = `https://gpcservice--tst1.custhelp.com/cgi-bin/gpcservice.cfg/php/custom/socoapicalls_noauth.php`;
    const formData = new FormData();
    formData.append("data", requestString);
    formData.append("apiUrl", "CUSTOM_CFG_SOCOMLP_GET_PREMISE_FLATBILL");

    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });

    const data = await response.json();
    return data;
  }

  function buildPremiseObj(response, premise) {
    const [getPremiseResult, getPremiseMeterResult, getFlatBillResult] = response;
    const getPremiseObj = {
      fullAddr: premise.address,
      addressNotes: premise.AddressNotes,
      rcdcMeter: "",
      meterNumber: "",
      meterStatus: "",
      meterPointNumber: "",
      meterPointStatus: "",
      meterPointType: "",
      programId: "",
      revenueClass: "",
      prepayEligible: "",
      avgMonthlyBillAmount: "",
      svcOrders: [],
    };

    // Premise Meter Details
    const svcPoint = getPremiseMeterResult.value.Payload.GetPremiseMeters.Premise?.ServicePoint;
    const svcPointWithMeters = svcPoint.find((o) => o?.Meter.length > 0);
    if (svcPointWithMeters) {
      getPremiseObj.meterNumber = svcPointWithMeters.Meter[0].meterNumber;
      getPremiseObj.meterStatus = svcPointWithMeters.Meter[0].meterStatus;
      getPremiseObj.meterPointNumber = svcPointWithMeters.Meter[0].meterPointNumber;
      getPremiseObj.programId = svcPointWithMeters.Meter[0].programId;
      getPremiseObj.revenueClass = svcPointWithMeters?.Agreements[0].tariffType;
    }

    const svcPointWithOrders = svcPoint.find((o) => o?.Accounts);
    if (svcPointWithOrders) {
      const account = svcPointWithOrders.Accounts[0].accountNo;
      const svcOrderArr = [];
      svcPointWithOrders.Accounts[0].ServiceOrder.forEach((svc) => {
        svcOrderArr.push({ billingAccount: account, type: svc.serviceOrderType, svcOrderDate: svc.serviceOrderDate });
      });

      getPremiseObj.svcOrders = svcOrderArr;
    }

    // Premise Details
    const svcPointPremise = getPremiseResult.value.Payload.GetPremise?.ServicePoints;
    svcPointPremise.forEach((svcPoint) => {
      let meters = svcPoint.Meters;
      meters.forEach((meter) => {
        if (meter.meterNumber === getPremiseObj.meterNumber) {
          getPremiseObj.meterPointStatus = meter.MeterPointStatus.code;
          getPremiseObj.meterPointType = meter.MeterPointType.code;
          getPremiseObj.prepayEligible = svcPointPremise.prepayEligibilityFlag === "true" ? "Yes" : "No";
          getPremiseObj.avgMonthlyBillAmount = svcPointPremise.avgMonthlyBillAmount;
        }
      });
    });

    return getPremiseObj;
  }

  function getPremiseDetailsHandler(premise) {
    setApiCallFlag(true);
    Promise.allSettled([getPremise(premise.premiseNo), getPremiseMeters(premise.premiseNo), getPremiseFlatBill(premise.premiseNo)]).then((response) => {
      const premiseDetailsAll = buildPremiseObj(response, premise);
      setPremiseDetails(premiseDetailsAll);
      setApiCallFlag(false);
    });
  }

  useEffect(() => {
    if (premiseResults.length > 0) {
      setSearchFormShow(false);
      setSearchResultShow(true);
    }
  }, [premiseResults]);

  useEffect(() => {
    if (premiseDetails?.meterNumber) {
      console.log("premisedetails", premiseDetails);
      setSearchResultShow(false);
      setSearchInfoShow(true);
    }
  }, [premiseDetails]);

  const searchFormSectionClick = useCallback(() => {
    setSearchFormShow((current) => !current);
  }, []);
  const searchResultSectionClick = useCallback(() => {
    setSearchResultShow((current) => !current);
  }, []);
  const searchInfoSectionClick = useCallback(() => {
    setSearchInfoShow((current) => !current);
  }, []);

  return (
    <Fragment>
      {apiCallFlag && <Spinner />}
      <div className={classes.main}>
        <Section title="Search" onClick={searchFormSectionClick}>
          {searchFormShow && (
            <form className={classes.searchForm} onSubmit={searchFormHandler}>
              <Input label="Street Name" id="streetName" value={streetName} onChange={setStreetName} />
              <Input label="City" id="city" value={city} onChange={setCity} />
              <Input label="State" id="state" value={state} onChange={setState} />
              <InputNumber label="Zip" id="zip" options={{ blocks: [4] }} value={zip} onChange={setZip} />
              <div className="btnGrp">
                <ButtonSubmit>Submit</ButtonSubmit>
                <ButtonCancel>Cancel</ButtonCancel>
              </div>
            </form>
          )}
        </Section>

        <Section title="Search Results" onClick={searchResultSectionClick}>
          {searchResultShow && (
            <table id="searchResults" className="table table-striped">
              <thead>
                <tr>
                  <th>Street Name</th>
                  <th>Address Notes</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip</th>
                </tr>
              </thead>
              <tbody>
                {premiseResults.map((premise, index) => (
                  <tr key={index} className={classes.resultsrow} onClick={getPremiseDetailsHandler.bind(null, premise)}>
                    <td>{premise.addressLine1}</td>
                    <td>{premise.AddressNotes}</td>
                    <td>{premise.city}</td>
                    <td>{premise.state}</td>
                    <td>{premise.zipCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>

        <Section title="Premise Information" onClick={searchInfoSectionClick}>
          {searchInfoShow && (
            <div>
              <div className={classes.premiseInfoMain}>
                <Field label="Premise Address" value={premiseDetails.fullAddr}></Field>
                <Field label="Address Notes" value={premiseDetails.addressNotes}></Field>
              </div>

              <div className={classes.premiseInfo}>
                <Section title="Details" open={true} noBtn>
                  <div className={classes.premiseInfoDetails}>
                    <Field label="Meter Point Status" value={premiseDetails.meterPointStatus}></Field>
                    <Field label="Meter Status" value={premiseDetails.meterStatus}></Field>
                    <Field label="RD/DC Meter" value={premiseDetails.rcdcMeter}></Field>
                    <Field label="Revenue Class" value={premiseDetails.revenueClass}></Field>
                    <Field label="Rate" value=""></Field>
                    <Field label="PrePay Eligible" value={premiseDetails.prepayEligible}></Field>
                  </div>
                </Section>
                <Section title="Pending Orders" open={true} noBtn>
                  {premiseDetails?.svcOrders && (
                    <table id="searchResults" className="table table-striped">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Bill Account</th>
                        </tr>
                      </thead>
                      <tbody>
                        {premiseDetails.svcOrders.map((o) => (
                          <tr>
                            <td>{o.svcOrderDate}</td>
                            <td>{o.type}</td>
                            <td>{o.billingAccount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Section>
              </div>

              <Section title="Pending Obligation" open={true} noBtn>
                <table id="pendingObligation" className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Bill Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2022-04-29</td>
                      <td>Connect</td>
                      <td>78037-54259</td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            </div>
          )}
        </Section>

        <div className="btnGrp">
          <div style={{ marginLeft: "auto" }}>
            <ButtonSubmit>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PremiseInfo;
