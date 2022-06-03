import create from "zustand";
import { devtools } from "zustand/middleware";

const useModalStore = create(
  devtools((set) => ({
    showModal: false,
    modalYLoc: "",
    setShowModal: (showModal) => set({ showModal }),
    setModalYLoc: (modalYLoc) => set({ modalYLoc }),
  }))
);

export default useModalStore;
