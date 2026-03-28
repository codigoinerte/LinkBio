import type { Link, Project } from "@/front/types/landing";
import type { Landing } from "@/types/landing";
import { create } from "zustand";

interface LandingProps {
    landing: Landing,
    setLanding: (landing:Landing) => void,
    setLinks: (links: Link[]) => void,
    setProjects: (projects: Project[]) => void,
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
    }

}));