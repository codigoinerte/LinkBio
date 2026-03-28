import { api } from "@/api/api.connection";
import type { GalleryDeleteResponse } from "../types/gallery.response";

class Gallery {
    async deleteImage(id:number):Promise<GalleryDeleteResponse>{
        const { data } = await api.delete<GalleryDeleteResponse>(`/galery/image/${id}`);
        return data;
    }
}

export default Gallery;