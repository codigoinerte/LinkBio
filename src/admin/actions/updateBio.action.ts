import { api } from "@/api/api.connection";
import type { ProfileAccountDeleteResponse, ProfilePhotoDeleteResponse, ProfilePhotoResponse, RequestBio, ResponseBio } from "../types/bio.response";

export const updateBioAction = async (params:RequestBio):Promise<ResponseBio> => {
    try {
        const { data } = await api.put("/auth/update-profile", params);
        return data;   
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const postPhoto = async (file:File):Promise<ProfilePhotoResponse> => {
    const formData = new FormData();
    formData.append('file', file);    

    try {
        const { data } = await api.postForm<ProfilePhotoResponse>("/upload/profile", formData);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deletePhoto = async ():Promise<ProfilePhotoDeleteResponse> => {
    try {
        const { data } = await api.delete<ProfilePhotoDeleteResponse>("/profile/photo");
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteAccount = async (force:boolean = false):Promise<ProfileAccountDeleteResponse> => {
    try {
        const { data } = await api.delete<ProfileAccountDeleteResponse>("auth/delete-account", {
            params: {
                force
            }
        });
        return data;        
    } catch (error) {
        console.log(error);
        throw error;
    }
}