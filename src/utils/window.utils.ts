import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import type { RefObject } from "react";

gsap.registerPlugin(Draggable, InertiaPlugin);

export function toggleMaximize(
  isMaximize: boolean,
  setIsMaximize: React.Dispatch<React.SetStateAction<boolean>>,
  ref: RefObject<HTMLDivElement | null>,
  titleBarRef: RefObject<HTMLDivElement | null>,
  draggableRef: RefObject<Draggable[] | null>
) {
  if (!ref.current) return;

  if (isMaximize) {
    setIsMaximize((prev: boolean) => !prev);
    gsap.set(ref.current, { clearProps: "transform" });

    gsap.to(ref.current, {
      height: "100%",
      width: "100%",
      borderRadius: 0,
      top: 0,
      left: 0,
      duration: 0.5,
    });
  } else {
    setIsMaximize((prev) => !prev);

    gsap.to(ref.current, {
      height: "384px",
      width: "672px",
      borderRadius: "12px",
      top: "80px",
      left: "80px",
      duration: 0.5,
      onComplete: () => {
        // After animation, re-enable Draggable
        draggableRef.current = Draggable.create(ref.current, {
          bounds: "body",
          inertia: true,
          edgeResistance: 0.65,
          trigger: titleBarRef.current,
        });
      },
    });
  }
}

// minimize logic
export function toggleMinimize(
  isMinimize: boolean,
  setIsMinimize: React.Dispatch<React.SetStateAction<boolean>>,
  ref: RefObject<HTMLDivElement | null>,
  titleBarRef: RefObject<HTMLDivElement | null>,
  draggableRef: RefObject<Draggable[] | null>
) {
  if (!ref.current) return;

  if (isMinimize) {
    setIsMinimize((prev) => !prev);
    gsap.set(ref.current, { clearProps: "transform" });

    gsap.to(ref.current, {
      height: "0%",
      width: "0%",
      top: "100%",
      left: "50%",
      translateX: "-50%",
      duration: 0.5,
    });
  } else {
    setIsMinimize((prev) => !prev);

    gsap.to(ref.current, {
      height: "384px",
      width: "672px",
      top: "80px",
      duration: 0.5,
      onComplete: () => {
        // After animation, re-enable Draggable
        draggableRef.current = Draggable.create(ref.current, {
          bounds: "body",
          inertia: true,
          edgeResistance: 0.65,
          trigger: titleBarRef.current,
        });
      },
    });
  }
}

export function toggleMenu(
  startMenuRef: RefObject<HTMLDivElement>,
  isOpen: boolean,
  toggleOpen: () => void
) {
  if (!isOpen) {
    toggleOpen();
    gsap.to(startMenuRef.current, {
      y: "-116%",
      duration: 0.5,
      ease: "power2.inOut"
    });
  } else {
    toggleOpen();
    gsap.to(startMenuRef.current, {
      y: "0",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }
}
