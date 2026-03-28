import { api } from "@/api/api.connection";
import type { LandingResponse } from "../types/landing";
import { AxiosError } from "axios";

class Landing{
    async getLanding(slug:string): Promise<LandingResponse>{
        try {
            const { data } = await api.post<LandingResponse>(`/landing`, { slug });
            return data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data as LandingResponse;
            }
            return { ok: false, message: "Error de conexión" };
        }
    }
}

export const landing = new Landing();