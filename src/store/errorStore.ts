import { create } from "zustand";

type ErrorStore = {
  errors: string[];
  addError: (error: string) => void;
  clearErrors: () => void;
};

export const useErrorStore = create<ErrorStore>()((set) => ({
  errors: [],
  addError: (error: string) =>
    set((state) => ({ errors: [...state.errors, error] })),
  clearErrors: () => set({ errors: [] }),
}));
