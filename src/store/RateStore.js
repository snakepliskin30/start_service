import create from "zustand";
import { devtools } from "zustand/middleware";

const useRateStore = create(
  devtools((set) => ({
    rateOption: "",
    setRateOption: (rateOption) => set({ rateOption }),
  }))
);

export default useRateStore;
