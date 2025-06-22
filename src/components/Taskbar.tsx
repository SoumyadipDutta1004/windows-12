import { taskbarIcons } from "../contexts/ui.context";
import { useSettingsStore } from "../stores/app.store";

export default function Taskbar() {
  const toggleSettings = useSettingsStore((state) => state.toggleOpen);
  const isSettingsOpen = useSettingsStore((state) => state.isOpen);

  function handleOpen(name: string) {
    if (name == "settings" && !isSettingsOpen) {
      toggleSettings();
    } else if(name == "settings") {
      const minimize = document.querySelector(".minimize");
      if (minimize) {
        minimize.click();
      }
    }
  }

  return (
    <div className="h-11 rounded-full bg-black/45 absolute bottom-0 z-10 mb-4 left-1/2 translate-x-[-50%] backdrop-blur-lg py-1.5 px-5">
      <div className="w-full h-full flex items-center justify-between gap-4">
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
