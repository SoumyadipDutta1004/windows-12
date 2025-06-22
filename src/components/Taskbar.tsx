import { taskbarIcons } from "../contexts/ui.context";

export default function Taskbar() {
  return (
    <div className="h-11 rounded-full bg-black/45 absolute bottom-0 mb-4 left-1/2 translate-x-[-50%] backdrop-blur-lg py-1.5 px-5">
      <div className="w-full h-full flex items-center justify-between gap-4">
        {taskbarIcons.map((icon) => (
          <img
            key={icon}
            src={icon}
            alt="Icons"
            className="size-8 cursor-pointer active:size-6 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
