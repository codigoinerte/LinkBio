import { api } from "@/api/api.connection";
import type { AuthResponse } from "../types/auth.response";

export const registerAction = async(nickname:string, email:string, password:string ):Promise<AuthResponse> => {
    try {
        const { data } = await api.post<AuthResponse>('/auth/register', { nickname, email, password });
    
        return  data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}