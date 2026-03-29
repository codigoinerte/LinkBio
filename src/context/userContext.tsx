import { checkAction } from '@/front/actions/check.action';
import { loginAction } from '@/front/actions/login.action';
import { loginExternalAction } from '@/front/actions/login.external.action';
import { registerAction } from '@/front/actions/register.action';
import type { User } from '@/front/types/auth.response';
import { Cookie } from '@/helpers/cookies';
import type { SuccessResponse } from '@greatsumini/react-facebook-login';
import type { TokenResponse } from '@react-oauth/google';
import { create } from 'zustand';

// type operation = 'signIn' | 'signUp';
type AuthStatus  = 'auth' | 'checking' | 'no-auth';

interface State {
    user: User | null;
    state: AuthStatus;
    token: string | null;
    login: (email:string, password:string) => Promise<boolean>;
    register: (nickname:string, email:string, password:string) => Promise<boolean>;
    logout: () => void;
    check: () => Promise<boolean>;
    updateProfile: (user: User) => void;
    updateProfilePhoto: (photo:string) => void;
    google: (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => Promise<boolean>;
    facebook: (token: SuccessResponse) => Promise<boolean>;
}

const initialState = {
    user: null,
    token: null,
    state: 'no-auth' as AuthStatus,
};

const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME;

export const useUserStore = create<State>((set, get) => ({
    ...initialState,    
    login: async (email:string, password:string) => {

        try {
            const { user, access_token } = await loginAction(email, password);
            set({ user, token: access_token, state: 'auth'})
            Cookie.set(COOKIE_NAME, access_token, 1);
            return true;
            
        } catch {
            set({ user: null, token: null, state: 'no-auth'})
            return false;
        }

    },
    register: async (nickname:string, email:string, password:string) => {
        try {
            const {user, access_token} = await registerAction(nickname, email, password);
            set({ user, token: access_token, state: 'auth'})
            Cookie.set(COOKIE_NAME, access_token, 1);
            return true;
        } catch {
            set({ user: null, token: null, state: 'no-auth'})
            return false;
        }
    },
    logout: () => {
        set({ user: null, token: null, state: 'no-auth' });
        Cookie.delete(COOKIE_NAME);
    },
    check: async () => {
        try {
            const { user, access_token } = await checkAction();
            set({ user, token: access_token, state: 'auth'});
            return true;
            
        } catch {
            set({ user: null, token: null, state: 'no-auth'})
            return false;
        }
    },
    updateProfile: async (user:User) => {
        set({ user });
    },
    updateProfilePhoto: (photo: string) => {
        const prevUser = get().user;
        if(!prevUser) return;

        const user:User = {
            ...prevUser,
            photo
        }
        set({ user });
    },
    google: async (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">):Promise<boolean> => {
        try {
            const { user, access_token } = await loginExternalAction.google(tokenResponse);
            set({ user, token: access_token, state: 'auth'})
            Cookie.set(COOKIE_NAME, access_token, 1);
            return true;            
        } catch {
            set({ user: null, token: null, state: 'no-auth'})
            return false;
        }        
    },
    facebook: async (token: SuccessResponse): Promise<boolean> => {
        try {
            const { user, access_token } = await loginExternalAction.facebook(token);
            set({ user, token: access_token, state: 'auth'})
            Cookie.set(COOKIE_NAME, access_token, 1);
            return true;            
        } catch {
            set({ user: null, token: null, state: 'no-auth'})
            return false;
        }    
    }
        
}));