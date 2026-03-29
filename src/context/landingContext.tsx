import type { WallpaperOptionId } from "@/admin/types/design";
import type { Link, Project } from "@/front/types/landing";
import type { Landing } from "@/types/landing";
import { create } from "zustand";

interface ThemeUpdateProps {
    preview:string,
    textColor:string,
    accent:string,
    wallpaper_type: WallpaperOptionId,
    wallpaperImage?: string,
}
interface LandingProps {
    landing: Landing,
    setLanding: (landing:Landing) => void,
    setLinks: (links: Link[]) => void,
    setProjects: (projects: Project[]) => void,
    setTheme: (props: ThemeUpdateProps) => void;
}

export const useLandingStore = create<LandingProps>((set, get) => ({

    landing: {
        preview         : "",
        textColor       : "",
        wallpaperImage  : "",
        wallpaper_type  : "color",
        photoImage      : "",
        is_verified     : false,
        name            : "",
        headline        : "",
        bio             : "",
        links           : [],
        accent          : "",
        projects        : [],
    },

    setLanding: (currentLanding:Landing) => {
        const prevLanding = get().landing;
        console.log(1);
        set({
            landing: {
                ...prevLanding,
                ...currentLanding
            }
        })
    },
    setLinks: (links:Link[]) => {
        const prevLanding = get().landing;
        set({
            landing: {
                ...prevLanding,
                links
            }
        })
    },
    setProjects: (projects: Project[]) => {
        const prevLanding = get().landing;
        set({
            landing: {
                ...prevLanding,
                projects
            }
        })
    },
    setTheme: (props: ThemeUpdateProps) => {
        const prevLanding = get().landing;
       
        set({
            landing: {
                ...prevLanding,
                ...props
            }
        })        
    }

}));