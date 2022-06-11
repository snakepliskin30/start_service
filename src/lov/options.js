export const titleOptions = Object.freeze([
  {
    value: "MR",
    display: "MR",
  },
  {
    value: "MS",
    display: "MS",
  },
  {
    value: "MRS",
    display: "MRS",
  },
  {
    value: "LT",
    display: "LT",
  },
]);

export const suffixOptions = Object.freeze([
  {
    value: "JR",
    display: "JR",
  },
  {
    value: "I",
    display: "I",
  },
  {
    value: "II",
    display: "II",
  },
]);

export const stateOptions = Object.freeze([
  { value: "AK", display: "AK", name: "Alaska" },
  { value: "TX", display: "TX", name: "Texas" },
  { value: "AL", display: "AL", name: "Alabama" },
  { value: "AR", display: "AR", name: "Arkansas" },
  { value: "AZ", display: "AZ", name: "Arizona" },
  { value: "CA", display: "CA", name: "California" },
  { value: "CO", display: "CO", name: "Colorado" },
  { value: "CT", display: "CT", name: "Connecticut" },
  { value: "DC", display: "DC", name: "DistrictofColumbia" },
  { value: "DE", display: "DE", name: "Delaware" },
  { value: "FL", display: "FL", name: "Florida" },
  { value: "GA", display: "GA", name: "Georgia" },
  { value: "HI", display: "HI", name: "Hawaii" },
  { value: "IA", display: "IA", name: "Iowa" },
  { value: "ID", display: "ID", name: "Idaho" },
  { value: "IL", display: "IL", name: "Illinois" },
  { value: "IN", display: "IN", name: "Indiana" },
  { value: "KS", display: "KS", name: "Kansas" },
  { value: "KY", display: "KY", name: "Kentucky" },
  { value: "LA", display: "LA", name: "Louisiana" },
  { value: "MA", display: "MA", name: "Massachusetts" },
  { value: "MD", display: "MD", name: "Maryland" },
  { value: "ME", display: "ME", name: "Maine" },
  { value: "MI", display: "MI", name: "Michigan" },
  { value: "MN", display: "MN", name: "Minnesota" },
  { value: "MO", display: "MO", name: "Missouri" },
  { value: "MS", display: "MS", name: "Mississippi" },
  { value: "MT", display: "MT", name: "Montana" },
  { value: "NC", display: "NC", name: "NorthCarolina" },
  { value: "ND", display: "ND", name: "NorthDakota" },
  { value: "NE", display: "NE", name: "Nebraska" },
  { value: "NH", display: "NH", name: "NewHampshire" },
  { value: "NJ", display: "NJ", name: "NewJersey" },
  { value: "NM", display: "NM", name: "NewMexico" },
  { value: "NV", display: "NV", name: "Nevada" },
  { value: "NY", display: "NY", name: "NewYork" },
  { value: "OH", display: "OH", name: "Ohio" },
  { value: "OK", display: "OK", name: "Oklahoma" },
  { value: "OR", display: "OR", name: "Oregon" },
  { value: "PA", display: "PA", name: "Pennsylvania" },
  { value: "RI", display: "RI", name: "RhodeIsland" },
  { value: "SC", display: "SC", name: "SouthCarolina" },
  { value: "SD", display: "SD", name: "SouthDakota" },
  { value: "TN", display: "TN", name: "Tennessee" },
  { value: "TX", display: "TX", name: "Texas" },
  { value: "UT", display: "UT", name: "Utah" },
  { value: "VA", display: "VA", name: "Virginia" },
  { value: "VT", display: "VT", name: "Vermont" },
  { value: "WA", display: "WA", name: "Washington" },
  { value: "WI", display: "WI", name: "Wisconsin" },
  { value: "WV", display: "WV", name: "WestVirginia" },
  { value: "WY", display: "WY", name: "Wyoming" },
]);

export const depositActionOptions = Object.freeze([
  {
    value: "Waive Deposit",
    display: "Waive Deposit",
  },
  {
    value: "Quote Deposit",
    display: "Quote Deposit",
  },
]);

export const paperlessActionOptions = Object.freeze([
  {
    value: "Enroll in Paperless",
    display: "Enroll in Paperless",
  },
  {
    value: "Not Interested in Paperless",
    display: "Not Interested in Paperless",
  },
  {
    value: "Send Paperless Info",
    display: "Send Paperless Info",
  },
]);

export const paperlessDaysBeforeDueDateOptions = Object.freeze([
  {
    value: "1",
    display: "1",
  },
  {
    value: "2",
    display: "2",
  },
  {
    value: "3",
    display: "3",
  },
  {
    value: "4",
    display: "4",
  },
  {
    value: "5",
    display: "5",
  },
]);

export const rateOptions = Object.freeze([
  {
    value: "Residential",
    display: "Residential",
  },
  {
    value: "FlatBill First Year",
    display: "FlatBill First Year",
  },
  {
    value: "Smart Usage",
    display: "Smart Usage",
  },
]);

export const meterPointStatus = Object.freeze({
  A: "Active",
  I: "Inactive",
  M: "Transfer",
  P: "Pending",
  R: "Removed",
});

export const meterStatus = Object.freeze({
  A: "Removed Mtr Svc Cut At Pole",
  B: "Removed Mtr-Cut At Weatherhead",
  C: "Cut At Weatherhead",
  D: "Cut At Underground Transformer",
  E: "Rmvd Mtr-Cut At Undrgrnd Trans",
  F: "Transformer Fuse Open",
  G: "Rmvd Mtr-Transformer Fuse Open",
  H: "Cut Out Non-Pay",
  I: "Inactive Off",
  J: "Removed Mtr-Cut Out Non-Pay",
  L: "PrePay Off",
  O: greenText("On"),
  P: "Service Cut At Pole",
  R: "Removed",
  V: "Removed Mtr Svc Cut At Pole",
});
