import create from "zustand";
import { devtools } from "zustand/middleware";

const useMailingStore = create(
  devtools((set) => ({
    mailingSameAsPremiseFlag: false,
    mailingAddressLine1: "",
    mailingAddressLine2: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    setMailingSameAsPremiseFlag: (mailingSameAsPremiseFlag) => set({ mailingSameAsPremiseFlag }),
    setMailingAddressLine1: (mailingAddressLine1) => set({ mailingAddressLine1 }),
    setMailingAddressLine2: (mailingAddressLine2) => set({ mailingAddressLine2 }),
    setMailingCity: (mailingCity) => set({ mailingCity }),
    setMailingState: (mailingState) => set({ mailingState }),
    setMailingZip: (mailingZip) => set({ mailingZip }),
  }))
);

export default useMailingStore;
