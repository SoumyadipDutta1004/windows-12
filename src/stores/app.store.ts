import { create } from "zustand";
import { taskbarIcons } from "../contexts/ui.context";
import type { RefObject } from "react";


interface SettingsStore {
  settingsRef: RefObject<HTMLDivElement | null> | null;
  icon: string;
  isOpen: boolean;

  setSettingsRef: (ref: RefObject<HTMLDivElement> | null) => void;
  toggleOpen: () => void;
}
interface StartMenu {
  startMenuRef: RefObject<HTMLDivElement | null> | null;
  isOpen: boolean;

  setStartMenuRef: (ref: RefObject<HTMLDivElement> | null) => void;
  toggleIsOpen: () => void;
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

export const useStartMenuStore = create<StartMenu>((set) => ({
  startMenuRef: null,
  isOpen: false,

  setStartMenuRef: (ref) => set({ startMenuRef: ref }),
  toggleIsOpen: () => 
    set((state) => ({
    isOpen: !state.isOpen
  })),
}));