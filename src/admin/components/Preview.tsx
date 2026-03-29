import { useLandingStore } from '@/context/landingContext';
import { useUserStore } from '@/context/userContext'
import { landing } from '@/front/actions/landing.action';
import { LandingContent } from '@/front/components/LandingContent';
import { themes } from '@/mock/theme';
import { useEffect, useRef } from 'react';

import { DeviceFrameset } from 'react-device-frameset'
import { type IdColor } from '../types/design';
import 'react-device-frameset/styles/marvel-devices.min.css'

const BASE_IMAGE = import.meta.env.VITE_BASE_URL_WALLPAPER;
const BASE_PROFILE = import.meta.env.VITE_BASE_URL_IMAGE;

export const Preview = () => {

    const loading = useRef(false);
    
    const user = useUserStore(state => state.user);
    const landingParams = useLandingStore(state => state.landing);
    const setLandingParams = useLandingStore(state => state.setLanding);

    useEffect(() => {
        
        (async ()=>{

            if(loading.current == true) return;
            loading.current = true;

            const response = await landing.getLanding(user!.nickname!);           

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

                wallpaper_color_type,
                wallpaper_color_custom,
                wallpaper_pattern_type,
            } = response.data!;

            const { preview, accent, textColor } = themes.find(theme => theme.id === theme_id)!;

            const wallpaperImage = wallpaper_file ? BASE_IMAGE + `/` + wallpaper_file : ``;
            const photoImage = photo ? BASE_PROFILE + `/` + photo : ``;

            setLandingParams({
                wallpaperImage,
                photoImage,
                preview,
                accent,
                textColor,
                wallpaper_type,
                headline,
                name,
                bio,
                links,
                projects,
                is_verified,
                ColorId: {
                    id: wallpaper_color_type as IdColor,
                    custom: wallpaper_color_custom
                },
                patternId: wallpaper_pattern_type,
            });

            loading.current = false;

        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div className="flex items-center justify-center sticky top-4.5">
            <DeviceFrameset device="iPhone 8" color="gold">
                <LandingContent {...landingParams} stylesContainerInner={{ margin: "0px auto 0px auto"}}/>
            </DeviceFrameset>            
        </div>
    )
}
