import { use, useEffect } from "react";
import { Navigate } from "react-router";

import type { LandingResponse } from "../types/landing";
import "../styles/landing.css";
import { themes } from "@/mock/theme";
import { LandingContent } from "./LandingContent";
import type { ColorId, IdColor } from "@/admin/types/design";


const BASE_IMAGE = import.meta.env.VITE_BASE_URL_WALLPAPER;
const BASE_PROFILE = import.meta.env.VITE_BASE_URL_IMAGE;

interface Props {
    promise: Promise<LandingResponse>;
}

type ColorIdUndefined = ColorId | undefined

export const LandingProfile = ({ promise }: Props) => {

    const response = use(promise);  
    
    if(response.ok == false) return <Navigate to="/" />;

    const {
        wallpaper_type,
        wallpaper_file,
        photo,
        theme_id = "air",

        headline,
        name,
        bio,
        links,
        projects,
        is_verified,
        wallpaper_pattern_type,
        wallpaper_color_type,
        wallpaper_color_custom,
    } = response.data!;

    const ColorId: ColorIdUndefined = wallpaper_type === "color" ? {
        id: wallpaper_color_type as IdColor,
        custom: wallpaper_color_custom
    }: undefined;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if(!document.querySelector("head title")) return;

        document.querySelector("head title")!.innerHTML = name;
    
    }, [name])
    

    const wallpaperImage = wallpaper_file ? BASE_IMAGE + `/` + wallpaper_file : ``;
    const photoImage = photo ? BASE_PROFILE + `/` + photo : ``;

    const { 
        preview, 
        accent, 
        textColor } = themes.find(theme => theme.id === theme_id)!;

    
    

    return <LandingContent 
        preview={preview}
        accent={accent}
        textColor={textColor}
        wallpaperImage={wallpaperImage}
        photoImage={photoImage}
        wallpaper_type={wallpaper_type}
        headline={headline}
        name={name}
        bio={bio}
        links={links}
        projects={projects}
        is_verified={is_verified}
        ColorId={ColorId}
        patternId={wallpaper_pattern_type}
    />
}
