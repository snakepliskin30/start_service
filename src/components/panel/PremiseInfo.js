import React, { Fragment, useEffect, useState } from "react";
import Accordion from "../layout/Accordion";
import Field from "../ui/Field";
import Section from "../layout/Section";
import Input from "../ui/Input";
import InputNumber from "../ui/InputNumber";
import ButtonSubmit from "../ui/ButtonSubmit";
import ButtonCancel from "../ui/ButtonCancel";

//Datatable Modules
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import classes from "./PremiseInfo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const premiseArray = [
  {
    streetName: "800 Willow Ridge Way",
    city: "Atlanta",
    state: "Georgia",
    zip: "1234",
  },
  {
    streetName: "800 Willow Ridge Way",
    city: "Atlanta",
    state: "Georgia",
    zip: "1234",
  },
  {
    streetName: "800 Willow Ridge Way",
    city: "Atlanta",
    state: "Georgia",
    zip: "1234",
  },
  {
    streetName: "800 Willow Ridge Way",
    city: "Atlanta",
    state: "Georgia",
    zip: "1234",
  },
  {
    streetName: "800 Willow Ridge Way",
    city: "Atlanta",
    state: "Georgia",
    zip: "1234",
  },
];

const PremiseInfo = () => {
  const [streetName, setStreeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("GA");
  const [zip, setZip] = useState("");
  // useEffect(() => {
  //   $("#searchResults").DataTable({
  //     paging: false,
  //     info: false,
  //     bFilter: false,
  //   });
  //   console.log("useEffect");
  // }, [renderTableValue]);

  // const renderTable = () => {
  //   setRenderTable((currentValue) => ++currentValue);
  //   console.log(renderTableValue);
  // };

  const searchPremiseFormHandler = (e) => {
    e.preventDefault();
    console.log(streetName, city, state, zip);
  };

  return (
    <Accordion title="Premise Address" id="premiseinfo">
      <div className={classes.main}>
        <Section title="Search" open={true}>
          <form
            className={classes.searchForm}
            onSubmit={searchPremiseFormHandler}
          >
            <Input
              label="Street Name"
              id="streetName"
              value={streetName}
              onChange={setStreeName}
            />
            <Input label="City" id="city" value={city} onChange={setCity} />
            <Input label="State" id="state" value={state} onChange={setState} />
            <InputNumber
              label="Zip"
              id="zip"
              options={{ blocks: [4] }}
              value={zip}
              onChange={setZip}
            />
            <div className="btnGrp">
              <ButtonSubmit>Submit</ButtonSubmit>
              <ButtonCancel>Cancel</ButtonCancel>
            </div>
          </form>
        </Section>

        <Section title="Search Results" open={false}>
          <table id="searchResults" className="table table-striped">
            <thead>
              <tr>
                <th>Street Name</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
              </tr>
            </thead>
            <tbody>
              {premiseArray.map((premise, index) => (
                <tr key={index}>
                  <td>{premise.streetName}</td>
                  <td>{premise.city}</td>
                  <td>{premise.state}</td>
                  <td>{premise.zip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Premise Information" open={false}>
          <div className={classes.premiseInfo}>
            <Section title="Details" open={true} noBtn>
              <div className={classes.premiseInfoDetails}>
                <Field label="Meter Point Status" value="Active"></Field>
                <Field label="Meter Status" value="On"></Field>
                <Field label="RD/DC Meter" value="Yes"></Field>
                <Field label="Revenue Class" value="Residential"></Field>
                <Field label="Rate" value="Residential"></Field>
                <Field label="PrePay Eligible" value="Yes"></Field>
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
        </Section>

        <div className="btnGrp">
          <div style={{ marginLeft: "auto" }}>
            <ButtonSubmit>Next</ButtonSubmit>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default PremiseInfo;
