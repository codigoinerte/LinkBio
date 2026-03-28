import type { WallpaperOptionId } from "@/admin/types/design";
import type { Link, Project } from "@/front/types/landing";

export interface Landing {
    preview:        string;
    textColor:      string;
    wallpaperImage: string;
    wallpaper_type: WallpaperOptionId;
    photoImage:     string;
    is_verified:    boolean;
    name:           string;
    headline:       string | null;
    bio:            string;
    links:          Link[]
    accent:         string;
    projects:       Project[]
}