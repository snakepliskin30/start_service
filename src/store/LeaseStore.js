import create from "zustand";
import { devtools } from "zustand/middleware";

const useLeaseStore = create(
  devtools((set) => ({
    leaseIdHold: "",
    leaseIncomingNumber: "",
    leaseCallbackNumber: "",
    leaseReason: "",
    leaseEmail: "",
    setLeaseIdHold: (leaseIdHold) => set({ leaseIdHold }),
    setLeaseIncomingNumber: (leaseIncomingNumber) => set({ leaseIncomingNumber }),
    setLeaseCallbackNumber: (leaseCallbackNumber) => set({ leaseCallbackNumber }),
    setLeaseReason: (leaseReason) => set({ leaseReason }),
    setLeaseEmail: (leaseEmail) => set({ leaseEmail }),
  }))
);

export default useLeaseStore;
