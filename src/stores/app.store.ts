import { create } from "zustand";
import { taskbarIcons } from "../contexts/ui.context";
import type { RefObject } from "react";
interface SettingsStore {
  settingsRef: RefObject<HTMLDivElement> | null;
  icon: string;
  isOpen: boolean;

  setSettingsRef: (ref: RefObject<HTMLDivElement> | null) => void;
  toggleOpen: () => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settingsRef: null,
  icon: taskbarIcons.settings,

  isOpen: false,
  isMinimize: false,

  setSettingsRef: (ref) => set({ settingsRef: ref }),

  toggleOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));