import type { RefObject } from "react";
import { menuIcons, taskbarIcons } from "../contexts/ui.context";
import { useSettingsStore, useStartMenuStore } from "../stores/app.store";
import { toggleMenu } from "../utils/window.utils";

export default function Taskbar() {
  const toggleSettings = useSettingsStore((state) => state.toggleOpen);
  const isSettingsOpen = useSettingsStore((state) => state.isOpen);

  const startMenuRef = useStartMenuStore((state) => state.startMenuRef);
  const toggleIsOpen = useStartMenuStore((state) => state.toggleIsOpen);
  const isMenuOpen = useStartMenuStore((state) => state.isOpen);

  function handleOpen(name: string) {
    if (name == "settings" && !isSettingsOpen) {
      toggleSettings();
    } else if (name == "settings") {
      const minimize = document.querySelector(".minimize") as HTMLElement | null;
      if (minimize) {
        minimize.click();
      }
    } else if (name == "start") {
      toggleMenu(
        startMenuRef as RefObject<HTMLDivElement>,
        isMenuOpen,
        toggleIsOpen
      );
    }
  }

  return (
    <div className="h-11 rounded-full bg-black/45 absolute bottom-0 z-10 mb-4 left-1/2 translate-x-[-50%] backdrop-blur-lg py-1.5 px-5">
      <div className="w-full h-full flex items-center justify-between gap-4">
        {Object.entries(menuIcons).map(([name, icon]) => (
          <img
            key={name}
            src={icon}
            alt={name}
            className="size-8 cursor-pointer active:size-6 transition-all duration-300"
            onClick={() => handleOpen(name)}
          />
        ))}
        <div className="h-6 w-[2px] bg-neutral-400 rounded-full" />
        {Object.entries(taskbarIcons).map(([name, icon]) => (
          <img
            key={name}
            src={icon}
            alt={name}
            className="size-8 cursor-pointer active:size-6 transition-all duration-300"
            onClick={() => handleOpen(name)}
          />
        ))}
      </div>
    </div>
  );
}
