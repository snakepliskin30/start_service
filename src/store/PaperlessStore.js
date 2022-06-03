import create from "zustand";
import { devtools } from "zustand/middleware";

const usePaperlessStore = create(
  devtools((set) => ({
    paperlessAction: "",
    paperlessEmail: "",
    paperlessDaysBeforeDue: "",
    paperlessReminderEmail: "",
    setPaperlessAction: (paperlessAction) => set({ paperlessAction }),
    setPaperlessEmail: (paperlessEmail) => set({ paperlessEmail }),
    setPaperlessDaysBeforeDue: (paperlessDaysBeforeDue) => set({ paperlessDaysBeforeDue }),
    setPaperlessReminderEmail: (paperlessReminderEmail) => set({ paperlessReminderEmail }),
  }))
);

export default usePaperlessStore;
