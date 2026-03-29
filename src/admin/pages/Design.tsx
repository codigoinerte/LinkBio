import { useEffect, useRef } from "react";
import { useParams } from "react-router"
import { LayoutWithPreviews } from "../Layout/LayoutWithPreviews";
import { Profile, Theme, Title, Wallpaper } from "../components";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import type { FormTypes } from "../types/design";
import WallpaperAction from "../actions/wallpaper.actions";
import { toast } from "sonner";
import { themes } from "@/mock/theme";
import { useLandingStore } from "@/context/landingContext";

type sectionKey = "profile" | "theme" | "wallpaper" | "style";
type reference = HTMLDivElement | null;

export const Design = () => {

    const setTheme = useLandingStore(state => state.setTheme);
    
    const wallpaper = new WallpaperAction();
    
    const RefSections = {
        profile: useRef<reference>(null),
        theme: useRef<reference>(null),
        wallpaper: useRef<reference>(null),
        style: useRef<reference>(null),
    };

    const { section } = useParams();

    const scrollToSection = (section: sectionKey) => {
        const ref = RefSections[section];
        ref?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToSection(section as sectionKey);

    const { control, watch, setValue, handleSubmit, clearErrors, } = useForm<FormTypes>({
        defaultValues:{
            themeId: "air",
            wallpaperId: "image"
        },
        
    });

    const themeIdSelected = watch("themeId");
    const wallpaperIdSelected = watch("wallpaperId");
    const colorIdSelected = watch("colorId");
    const fileSelected = watch("file");
    const patternIdSelected = watch("patternId");


    const onSubmit = async (params:FormTypes) => {
        const payload: FormTypes = {
            ...params,
            file: params.file instanceof File ? params.file : undefined,
        };

        try {            
            await wallpaper.storeUpdateWallpaper(payload);
            toast.success("Se actualizo el diseño con exito");
        } catch (error) {
            console.log(error);
            toast.warning("Vuelva a intentar más tarde");
        }
    }

    useEffect(() => {

        (async ()=>{

            const response = await wallpaper.getWallpaper();
            if(!response.ok || !response.profileDesign) return;

            setValue('themeId', response.profileDesign!.themeId);
            setValue('wallpaperId', response.profileDesign!.wallpaperId);
                        
            setValue('colorId', response.profileDesign?.colorId);
            setValue('file', response.profileDesign.file);
            setValue('patternId', response.profileDesign?.patternId);
            
        })();
      
      return () => {
        
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    useEffect(() => {

        const themeSelected = themes.find(theme => theme.id === themeIdSelected)!;

        setTheme({
            accent: themeSelected?.accent ?? '',
            preview: themeSelected?.preview ?? '',
            textColor: themeSelected?.textColor ?? '',
            wallpaper_type: wallpaperIdSelected ?? "pattern",

            ...((fileSelected && fileSelected instanceof File) ? {wallpaperImage: URL.createObjectURL(fileSelected) } : {}),

            ...(wallpaperIdSelected == "color" && colorIdSelected ? { ColorId: colorIdSelected}: {} ),
            
            ...(wallpaperIdSelected == "pattern" && patternIdSelected ? { patternId: patternIdSelected }: {})
        });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeIdSelected,
        wallpaperIdSelected,
        colorIdSelected,
        fileSelected,
        patternIdSelected,
    ])
    

    return (
        
        <LayoutWithPreviews>
        
            <Title title="Profile">  
                <Button 
                    type="submit" 
                    variant="outline" 
                    className="border-none cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                    form="design-form">
                    <Save />
                    Save
                </Button>
            </Title>
            
            <div ref={RefSections.profile} className="" id="profile">
                <Profile />
            </div>

            <form id="design-form" onSubmit={handleSubmit(onSubmit)}>
                <div ref={RefSections.theme} className="" id="theme">
                    <Theme control={control}/>
                </div>
                <div ref={RefSections.wallpaper} className="" id="wallpaper">
                    <Wallpaper control={control} watch={watch} setValue={setValue} clearErrors={clearErrors}/>
                </div>
            </form>
        </LayoutWithPreviews>
    )
}
