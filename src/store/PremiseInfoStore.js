import create from "zustand";
import { devtools } from "zustand/middleware";

const usePremiseInfoStore = create(
  devtools((set) => ({
    selectedPremiseInfo: {},
    setSelectedPremiseInfo: (selectedPremiseInfo) => set({ selectedPremiseInfo }),
  }))
);

export default usePremiseInfoStore;
