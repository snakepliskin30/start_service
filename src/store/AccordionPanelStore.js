import create from "zustand";
import { devtools } from "zustand/middleware";

const useAccordionPanelStore = create(
  devtools((set) => ({
    openPremise: true,
    openCustomerInfo: false,
    openCreditCheck: false,
    openDeposit: false,
    openLease: false,
    openPaperless: false,
    openMailingAddress: false,
    openRateOptions: false,
    openFinalItems: false,
    showModal: false,
    setOpenPremise: (openPremise) => set({ openPremise }),
    setOpenCustomerInfo: (openCustomerInfo) => set({ openCustomerInfo }),
    setOpenCreditCheck: (openCreditCheck) => set({ openCreditCheck }),
    setOpenDeposit: (openDeposit) => set({ openDeposit }),
    setOpenLease: (openLease) => set({ openLease }),
    setOpenPaperless: (openPaperless) => set({ openPaperless }),
    setOpenMailingAddress: (openMailingAddress) => set({ openMailingAddress }),
    setOpenRateOptions: (openRateOptions) => set({ openRateOptions }),
    setOpenFinalItems: (openFinalItems) => set({ openFinalItems }),
    setShowModal: (showModal) => set({ showModal }),
  }))
);

export default useAccordionPanelStore;
