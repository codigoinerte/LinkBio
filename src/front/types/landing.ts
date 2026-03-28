import type { WallpaperOptionId } from "@/admin/types/design";
import type { icons } from "lucide-react";

export interface LandingResponse {
    ok:   boolean;
    message?: string;
    data?: Data;
}

export interface Data {
    name:                   string;
    photo:                  string;
    nickname:               string;
    headline:               string | null;
    bio:                    string;
    website:                string;
    is_verified:            boolean;
    theme_id:               string;
    wallpaper_type:         WallpaperOptionId;
    wallpaper_file:         string;
    wallpaper_color_type:   string;
    wallpaper_color_custom: string;
    wallpaper_pattern_type: string;
    links:                  Link[];
    projects:               Project[];
}

export interface Link{
    id:                   number;
    title:                string;
    description:          string;
    url:                  string;
    name:                 string;
    code:                 string;
    icon:                 keyof typeof icons;
    category_url:         string;
    image:                null;
    category_description: string;
}

export interface Project {
    id:                string;
    name:              string;
    description:       string;
    short_description: string;
    link:              string;
    location:          string;
    from:              Date;
    to:                Date;
    galery:            Galery[];
}

export interface Galery {
    id:         number;
    origin_id:  number;
    name:       string;
    image_path: string;
}
