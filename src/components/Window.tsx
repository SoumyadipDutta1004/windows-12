// ResizableWindow.tsx
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import { windowIcons } from "../contexts/ui.context";
import { toggleMaximize, toggleMinimize } from "../utils/window.utils";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function Window({
  ref,
  title,
  children,
  close,
}: {
  ref: RefObject<HTMLDivElement | null>;
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  const [isMaximize, setIsMaximize] = useState<boolean>(false);
  const [isMinimize, setIsMinimize] = useState<boolean>(false);

  ref = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  useEffect(() => {
    // Draggable Window
    if (Draggable) {
      draggableRef.current = Draggable.create(ref.current, {
        bounds: "body",
        inertia: true,
        edgeResistance: 0.65,
        trigger: titleBarRef.current,
      });
    }

    // Resizable logic (basic)
    const resizer = resizerRef.current;
    const windowEl = ref.current;

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
  }, [ref]);

  return (
    <div
      ref={ref}
      className="absolute top-20 left-20 z-100 w-2xl h-96 bg-black/45 backdrop-blur-lg rounded-xl overflow-hidden"
    >
      <div
        ref={titleBarRef}
        className="bg-neutral-700 cursor-move h-9 flex justify-between items-center"
      >
        <div className=" text-white font-semibold font-inter px-8">{title}</div>
        <div className="flex">
          <div
            className="minimize h-9 w-12 hover:bg-neutral-600 duration-75 flex items-center justify-center text-2xl text-white"
            onClick={() =>
              toggleMinimize(
                isMinimize,
                setIsMinimize,
                ref,
                titleBarRef,
                draggableRef
              )
            }
          >
            <img src={windowIcons.minimize} alt="" className="w-5 invert-100" />
          </div>
          <div
            className="h-9 w-12 hover:bg-neutral-600 duration-75 flex items-center justify-center"
            onClick={() =>
              toggleMaximize(
                isMaximize,
                setIsMaximize,
                ref,
                titleBarRef,
                draggableRef
              )
            }
          >
            <img src={windowIcons.maximize} alt="" className="w-5 invert-100" />
          </div>
          <div
            className="h-9 w-12 hover:bg-red-600 duration-75 flex items-center justify-center text-2xl text-white"
            onClick={close}
          >
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
