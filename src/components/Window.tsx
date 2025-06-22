// ResizableWindow.tsx
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import { windowIcons } from "../contexts/ui.context";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function Window({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [isMaximize, setIsMaximize] = useState<boolean>(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  // maximize logic
  function maximize() {
    if (!windowRef.current) return;

    if (isMaximize) {
      setIsMaximize((prev) => !prev);
      // windowRef.current.style.borderRadius = "0%";
      // windowRef.current.style.width = "100%";
      // windowRef.current.style.height = "100%";
      gsap.set(windowRef.current, { clearProps: "transform" });

      gsap.to(windowRef.current, {
        height: "100%",
        width: "100%",
        borderRadius: 0,
        top: 0,
        left: 0,
        duration: 0.5,
      });
    } else {
      setIsMaximize((prev) => !prev);
      gsap.to(windowRef.current, {
        height: "384px",
        width: "672px",
        borderRadius: "12px",
        top: "80px",
        left: "80px",
        duration: 0.5,
        onComplete: () => {
          // After animation, re-enable Draggable
          draggableRef.current = Draggable.create(windowRef.current, {
            bounds: "body",
            inertia: true,
            edgeResistance: 0.65,
            trigger: titleBarRef.current,
          });
        },
      });
    }
  }

  useEffect(() => {
    // Draggable Window
    if (Draggable) {
      draggableRef.current = Draggable.create(windowRef.current, {
        bounds: "body",
        inertia: true,
        edgeResistance: 0.65,
        trigger: titleBarRef.current,
      });
    }

    // Resizable logic (basic)
    const resizer = resizerRef.current;
    const windowEl = windowRef.current;

    let isResizing = false;

    const onMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      isResizing = true;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing || !windowEl || !draggableRef.current) return;

      const dragInstance = draggableRef.current[0];
      const x = dragInstance.x;
      const y = dragInstance.y;

      const newWidth = e.clientX - (windowEl.offsetLeft + x);
      const newHeight = e.clientY - (windowEl.offsetTop + y);

      windowEl.style.width = `${newWidth}px`;
      windowEl.style.height = `${newHeight}px`;
    };

    const onMouseUp = () => {
      isResizing = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    resizer?.addEventListener("mousedown", onMouseDown);

    return () => {
      resizer?.removeEventListener("mousedown", onMouseDown);
    };
  }, [windowRef]);

  return (
    <div
      ref={windowRef}
      className="absolute top-20 left-20 z-100 w-2xl h-96 bg-black/45 backdrop-blur-lg rounded-xl overflow-hidden"
    >
      <div
        ref={titleBarRef}
        className="bg-neutral-700 cursor-move h-9 flex justify-between items-center"
      >
        <div className=" text-white font-semibold font-inter px-8">{title}</div>
        <div className="flex">
          <div className="h-9 w-12 hover:bg-neutral-600 duration-75 flex items-center justify-center text-2xl text-white">
            <img src={windowIcons.minimize} alt="" className="w-5 invert-100" />
          </div>
          <div
            className="h-9 w-12 hover:bg-neutral-600 duration-75 flex items-center justify-center"
            onClick={maximize}
          >
            <img src={windowIcons.maximize} alt="" className="w-5 invert-100" />
          </div>
          <div className="h-9 w-12 hover:bg-red-600 duration-75 flex items-center justify-center text-2xl text-white">
            <img src={windowIcons.close} alt="" className="w-5 invert-100" />
          </div>
        </div>
      </div>
      <div className="select-none">{children}</div>
      <div
        ref={resizerRef}
        className="absolute w-4 h-4 bottom-0 right-0 bg-neutral-700 cursor-se-resize"
      />
    </div>
  );
}
