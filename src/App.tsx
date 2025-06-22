import Clock from "./components/Clock";
import Taskbar from "./components/Taskbar";
import Wallpaper from "./components/Wallpaper";
import WallpaperChanger from "./components/WallpaperChanger";
import Window from "./components/Window";

export default function App() {
  return (
    <main className="h-screen w-full overflow-hidden relative">
      <Window title="Settings">
        <WallpaperChanger />
      </Window>
      <Clock />
      <Taskbar />
      <Wallpaper />
    </main>
  );
}
