import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000 * 60); // Update every 1 minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  function formatTime(date: Date) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formattedDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      weekday: "long", // "Tuesday"
      day: "2-digit", // "22"
    });
  }

  return (
    <div className="absolute top-36 left-1/2 translate-x-[-50%] pointer-events-none">
      <div className="flex flex-col items-center text-clock">
        <h2 className="text-8xl font-semibold font-inter">
          {formatTime(time).split(" ")[0]}
        </h2>
        <p className="text-2xl font-semibold font-inter">
          {formattedDate(time).split(" ").reverse().join(", ")}
        </p>
      </div>
    </div>
  );
}
