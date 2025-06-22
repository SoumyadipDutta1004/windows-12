import type { RefObject } from "react";
import Clock from "./components/Clock";
import StartMenu from "./components/StartMenu";
import Taskbar from "./components/Taskbar";
import Wallpaper from "./components/Wallpaper";
import WallpaperChanger from "./components/WallpaperChanger";
import Window from "./components/Window";
import { useSettingsStore } from "./stores/app.store";

export default function App() {
  const isSettingsOpen = useSettingsStore((state) => state.isOpen);
  const toggleSettings = useSettingsStore((state) => state.toggleOpen);

  const setSettingsRef = useSettingsStore((state) => state.setSettingsRef);
  const settingsRef = useSettingsStore((state) => state.settingsRef);

  return (
    <main className="h-screen w-full overflow-hidden relative">
      <StartMenu />
      {isSettingsOpen && (
        <Window
          title="Settings"
          ref={settingsRef as RefObject<HTMLDivElement>}
          setRef={setSettingsRef}
          close={toggleSettings}
        >
          <WallpaperChanger />
        </Window>
      )}
      <Clock />
      <Taskbar />
      <Wallpaper />
    </main>
  );
}
