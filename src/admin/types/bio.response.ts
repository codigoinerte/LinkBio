import type { User } from "@/front/types/auth.response";

export interface RequestBio{
    name: string;
    nickname: string;
    bio: string;
    website: string;
    headline:string;
}

export interface ResponseBio {
    message: string;
    user:    User;
}

/* profile photo update response */
export interface ProfilePhotoResponse {
    image: string;
}

/* profile photo delete response */
export interface ProfilePhotoDeleteResponse {
    message: string;
}

/* profile account delete response */
export interface ProfileAccountDeleteResponse {
    message: string;
}
