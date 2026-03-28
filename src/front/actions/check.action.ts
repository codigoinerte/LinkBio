import { api } from "@/api/api.connection";
import type { AuthResponse } from "../types/auth.response";
import { Cookie } from "@/helpers/cookies";

const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME;

export const checkAction = async ():Promise<AuthResponse> => {

    const token = Cookie.get(COOKIE_NAME);
    if(!token) throw new Error('No token found');

    try {
        const { data } = await api.post<AuthResponse>('/auth/validate-token');
        Cookie.set(COOKIE_NAME, data.access_token, 1);
        return  data;
        
    } catch {
        Cookie.delete(COOKIE_NAME);
        throw new Error('Token expired');
    }
}