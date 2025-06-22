import { wallpaper } from "../contexts/ui.context";
import { useWallpaperStore } from "../stores/wallpaper";

export default function WallpaperChanger() {

  const wallpaperChanger = useWallpaperStore((state) => state.changeWallpaper);

  return (
    <div className="w-full h-full px-6 py-10">
      <div className="flex flex-wrap items-center gap-4">
        {wallpaper.map((img) => (
          <img
            key={img}
            src={img}
            alt="wallpaper"
            className="aspect-video w-36 rounded-lg cursor-pointer"
            onClick={() => {
              wallpaperChanger(img);
            }}
          />
        ))}
      </div>
    </div>
  );
}
