import { useWallpaperStore } from "../stores/wallpaper";

export default function Wallpaper() {
  const wallpaper = useWallpaperStore((state) => state.wallpaper);

  return (
    <img
      src={wallpaper}
      alt="Wallpaper"
      className="h-full w-full object-cover absolute top-0 left-0 -z-10"
    />
  );
}
