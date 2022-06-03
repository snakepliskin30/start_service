import create from "zustand";
import { devtools } from "zustand/middleware";

const useDepositStore = create(
  devtools((set) => ({
    depositAction: "",
    depositAmount: "0.00",
    depositOnHold: "",
    setDepositAction: (depositAction) => set({ depositAction }),
    setDepositAmount: (depositAmount) => set({ depositAmount }),
    setDepositOnHold: (depositOnHold) => set({ depositOnHold }),
  }))
);

export default useDepositStore;
