import { useState, useEffect } from "react";
import CustomerInfo from "./CustomerInfo";
import PremiseInfo from "./PremiseInfo";
import CreditCheck from "./CreditCheck";
import Deposit from "./Deposit";
import Lease from "./Lease";
import Paperless from "./Paperless";
import MailingAddress from "./MailingAddress";
import RateOptions from "./RateOptions";
import FinalItems from "./FinalItems";
import Modal from "../layout/Modal";

import { StartServiceContextProvider } from "../../store/StartServiceContext";
import { tab } from "@testing-library/user-event/dist/tab";

const StartService = () => {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const betouching = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "buffer") {
            setTop((old) => old - 20);
          }
        } else {
          if (entry.target.id === "nav") {
            setTop((old) => old + 100);
          }
        }
      });
    };

    let options = {
      root: null,
      rootMargin: "-130px 0px",
      threshold: 0.05,
    };
    let observer = new IntersectionObserver(betouching, options);
    const nav = document.getElementById("nav");
    const buffer = document.getElementById("buffer");
    observer.observe(nav);
    observer.observe(buffer);

    let parentWindow = window.parent;
    let table = parentWindow.document.querySelector("#tabContent").querySelector("div[data-recordid='2909']").querySelector("iframe[name^='Start_Service_React']").closest("div.ws-workspace-table");
    console.log(table);
    table.addEventListener("scroll", (e) => {
      console.log(e.top);
    });
  }, []);

  const myStyle = () => {
    return {
      position: "absolute",
      top: top,
      zIndex: "99",
      transition: "top 0.1s linear",
      width: "100%",
    };
  };

  const buffer = () => {
    return {
      height: "50px",
      width: "100%",
      backgroundColor: "green",
      marginBottom: "20px",
    };
  };

  const nav = () => {
    return {
      height: "100px",
      width: "100%",
      backgroundColor: "red",
    };
  };

  return (
    <div style={{ position: "relative" }} data-ws-id="startservice_1234">
      <StartServiceContextProvider>
        <div style={myStyle()}>
          <div style={buffer()} id="buffer">
            Intersection Observer
          </div>
          <div style={nav()} id="nav">
            Intersection Observer
          </div>
        </div>
        <Modal />
        <PremiseInfo />
        <CustomerInfo />
        <CreditCheck />
        <Deposit />
        <Lease />
        <Paperless />
        <MailingAddress />
        <RateOptions />
        <FinalItems />
      </StartServiceContextProvider>
    </div>
  );
};

export default StartService;
