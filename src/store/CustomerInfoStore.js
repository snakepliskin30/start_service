import create from "zustand";
import { devtools } from "zustand/middleware";

const useCustomerInfoStore = create(
  devtools((set) => ({
    customerInfo: true,
    setCustomerInfo: (customerInfo) => set({ customerInfo }),
  }))
);

export default useCustomerInfoStore;
