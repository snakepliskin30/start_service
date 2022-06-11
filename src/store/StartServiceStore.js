import create from "zustand";
import { devtools } from "zustand/middleware";

const useStartServiceStore = create(
  devtools((set) => ({
    startAccountNumber: "",
    setStartAccountNumber: (startAccountNumber) => set({ startAccountNumber }),
  }))
);

export default useStartServiceStore;
