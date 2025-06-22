import { create } from 'zustand';
import { wallpaper } from '../contexts/ui.context';


type WallpaperState = {
  wallpaper: string;
  changeWallpaper: (newWallpaper: string) => void;
}

export const useWallpaperStore = create<WallpaperState>((set) => ({
  wallpaper: wallpaper[3],
  changeWallpaper: (newWallpaper: string) => set({ wallpaper: newWallpaper }),
}));
