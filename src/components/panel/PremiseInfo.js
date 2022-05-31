import React, { Fragment, useEffect, useState, useCallback, useContext } from "react";
import useSearchPremise from "../../hooks/useSearchPremise";
import usePremiseDetails from "../../hooks/usePremiseDetails";
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

import StartServiceContext from "../../store/StartServiceContext";

const PremiseInfo = (props) => {
  const ctx = useContext(StartServiceContext);
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
  const { premiseSearchLoad, searchPremise } = useSearchPremise();
  const { premiseDetailsLoad, getPremiseDetails } = usePremiseDetails();

  const searchFormHandler = async (e) => {
    e.preventDefault();
    const result = await searchPremise(streetName, city, state, zip);
    setPremiseResults(result);
  };

  const getPremiseDetailsHandler = async (premise) => {
    const result = await getPremiseDetails(premise.premiseNo, premise.companyCode === "GPC" ? "2" : "5");

    const meterDetails = result.GetPremise.ServicePoints.find((i) => i.ServicePointType.code === "0200")?.Meters[0];
    const meterDetails_gm = result.GetPremiseMeters.Premise?.ServicePoint[0];
    setPremiseDetails({
      meterPointStatus: meterDetails.MeterStatus.code,
      meterStatus: meterDetails.MeterStatus.code,
      rddcMeter: meterDetails_gm?.Meter[0]?.remoteConnectFlag,
      revenueClass: meterDetails_gm?.Agreements[0].tariffType,
      prepayEligible: result.GetPremise.prepayEligibilityFlag,
      detail1: `${premise.addressLine1} \n`,
      detail2: `${premise.city} ${premise.state} ${premise.zipCode}`,
      addressNotes: premise.AddressNotes,
      obligations: result.GetObligation,
    });
  };

  useEffect(() => {
    if (premiseResults.length > 0) {
      setSearchFormShow(false);
      setSearchInfoShow(false);
      setSearchResultShow(true);
    }
  }, [premiseResults]);

  useEffect(() => {
    if (premiseDetails?.meterPointStatus) {
      setSearchFormShow(false);
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
  const premiseNext = () => {
    ctx.setOpenPremise(false);
    ctx.setOpenCustomerInfo(true);
  };

  return (
    <Accordion title="Premise Address" id="premiseinfo" open={ctx.openPremise} setOpen={ctx.setOpenPremise}>
      {(premiseSearchLoad || premiseDetailsLoad) && <Spinner />}
      <div className={classes.main}>
        <Section title="Search" onClick={searchFormSectionClick}>
          {searchFormShow && (
            <form className={classes.searchForm} onSubmit={searchFormHandler}>
              <Input label="Street Name" id="streetName" value={streetName} onChange={setStreetName} />
              <Input label="City" id="city" value={city} onChange={setCity} />
              <Input label="State" id="state" value={state} onChange={setState} />
              <InputNumber label="Zip" id="zip" options={{ blocks: [5] }} value={zip} onChange={setZip} />
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
              <div className={classes.premiseInfo}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  <Field label="Premise Address" value={premiseDetails.detail1 + "\n" + premiseDetails.detail2}></Field>
                  <Field label="Address Notes" value={premiseDetails.addressNotes}></Field>
                </div>
                <div></div>
                <Section title="Details" open={true} noBtn>
                  <div className={classes.premiseInfoDetails}>
                    <Field label="Meter Point Status" value={premiseDetails.meterPointStatus}></Field>
                    <Field label="Meter Status" value={premiseDetails.meterStatus}></Field>
                    <Field label="RC/DC Meter" value={premiseDetails.rddcMeter}></Field>
                    <Field label="Revenue Class" value={premiseDetails.revenueClass}></Field>
                    <Field label="Rate" value="Residential"></Field>
                    <Field label="PrePay Eligible" value={premiseDetails.prepayEligible}></Field>
                  </div>
                </Section>
                <Section title="Pending Orders" open={true} noBtn>
                  <table id="searchResults" className="table table-striped">
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

              <Section title="Pending Obligation" open={true} noBtn>
                {premiseDetails?.obligations?.length > 0 && (
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
                )}
                {premiseDetails?.obligations?.length === 0 && <h6 style={{ textAlign: "center", color: "blue" }}>This premise has no obligations</h6>}
              </Section>
            </div>
          )}
        </Section>

        <div className="btnGrp">
          <div style={{ marginLeft: "auto" }}>
            <ButtonSubmit onClick={premiseNext}>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default PremiseInfo;
