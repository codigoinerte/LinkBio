import { api } from "@/api/api.connection";
import type { TokenResponse } from "@react-oauth/google";
import type { AuthResponse } from "../types/auth.response";
import type { SuccessResponse } from "@greatsumini/react-facebook-login";

class LoginExternalAction {
    async google (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">):Promise<AuthResponse> {
        try {
            const { data } = await api.post('auth/google', {
                token: tokenResponse.access_token
            });
            return data;            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async facebook (response: SuccessResponse):Promise<AuthResponse>{
        try {
            const { data } = await api.post('auth/facebook', {
                token: response.accessToken
            });
            return data;            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const loginExternalAction = new LoginExternalAction();