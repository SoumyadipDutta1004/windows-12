import { useEffect, useRef, type RefObject } from "react";
import { taskbarIcons } from "../contexts/ui.context";
import { useStartMenuStore } from "../stores/app.store";

export default function StartMenu() {

  const startMenuRef = useRef<HTMLDivElement | null>(null);
  const setStartMenuRef = useStartMenuStore((state) => state.setStartMenuRef);

  useEffect(() =>{
    if(startMenuRef){
      setStartMenuRef(startMenuRef as RefObject<HTMLDivElement>);
    }
  }, [setStartMenuRef]);

  return (
    <div 
      ref={startMenuRef}
      className="absolute -bottom-[70%] left-1/2 translate-x-[-50%] z-1 w-156 h-172 bg-black/45 backdrop-blur-lg rounded-xl overflow-hidden">
      <div className="flex flex-col items-center px-12 py-10">
        <div className="w-full rounded-full bg-neutral-700 flex items-center px-2.5">
          <img src="/icons/search.png" alt="" className="size-5" />
          <input
            type="text"
            placeholder="Search for apps"
            className="w-full px-3 py-1.5 outline-none text-neutral-300 leading-0"
          />
        </div>
        <div className="w-full grid grid-cols-6 justify-items-center mt-10">
          {Object.entries(taskbarIcons).map(([name, icon]) => (
            <div className="flex flex-col items-center">
              <img
                key={name}
                src={icon}
                alt={name}
                className="size-10 cursor-pointer active:size-6 transition-all duration-300"
              />
              <span className="text-neutral-300 text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-16 bg-black/15 backdrop-blur-lg absolute bottom-0 left-0 flex items-center justify-between px-12">
        <div className="flex items-center gap-1">
          <img
            src="/icons/Chrome.png"
            alt="profile picture"
            className="size-8 cursor-pointer"
          />
          <span className="text-neutral-300 text-sm">Soumyadip Dutta</span>
        </div>
        <div>
          <img src="/icons/power.png" alt="" className="size-5 invert-100 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
