import Clock from "./components/Clock";
import Taskbar from "./components/Taskbar";
import Wallpaper from "./components/Wallpaper";
import WallpaperChanger from "./components/WallpaperChanger";
import Window from "./components/Window";
import { useSettingsStore } from "./stores/app.store";

export default function App() {
  const isSettingsOpen = useSettingsStore((state) => state.isOpen);
  const toggleSettings = useSettingsStore((state) => state.toggleOpen);

  const settingsRef = useSettingsStore((state) => state.setSettingsRef);

  return (
    <main className="h-screen w-full overflow-hidden relative">
      {isSettingsOpen && (
        <Window title="Settings" ref={settingsRef} close={toggleSettings}>
          <WallpaperChanger />
        </Window>
      )}
      <Clock />
      <Taskbar setSettings={toggleSettings} />
      <Wallpaper />
    </main>
  );
}
