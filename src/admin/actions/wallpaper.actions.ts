import { api } from "@/api/api.connection";
import type { DeleteWallpaperImage, FormTypes, GetWallpaperResponse, StoreWallpaperResponse } from "../types/design";

const BASE_IMAGE = import.meta.env.VITE_BASE_URL_WALLPAPER;

class WallpaperAction {
    async getWallpaper ():Promise<GetWallpaperResponse> {
        const {data} = await api.get<GetWallpaperResponse>(`/user-profile-design`);
        return {
            ok: data.ok,
            message: data.message,
            profileDesign: {
                themeId: data.profileDesign!.themeId,
                wallpaperId: data.profileDesign!.wallpaperId,
                colorId: data.profileDesign!.colorId,
                patternId: data.profileDesign!.patternId,
                
                file: data.profileDesign?.file && data.profileDesign?.file != "null" ? BASE_IMAGE + `/` +data.profileDesign.file : undefined,
            }
        };
    }
    async storeUpdateWallpaper (params:FormTypes):Promise<StoreWallpaperResponse> {
        const {data} = await api.postForm<StoreWallpaperResponse>(`/user-profile-design`, params);
        return {
            ok: data.ok,
            profileDesign: {
                ...data.profileDesign,
                file: data.profileDesign.file ? BASE_IMAGE + `/` +data.profileDesign.file : undefined,
            }
        };
    }
    async deleteWallpaperImage ():Promise<DeleteWallpaperImage>{
        const {data} = await api.delete<DeleteWallpaperImage>(`/profile/wallpaper`);
        return data;
    }
}

export default WallpaperAction;