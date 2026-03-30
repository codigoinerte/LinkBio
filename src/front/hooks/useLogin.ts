import { useUserStore } from "@/context/userContext";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useLogin = () => {

    const navigate = useNavigate();

    const [isPosting, setIsPosting] = useState({
        isLogin:false,
        isRegister:false,
    })

    // input form signin
    const signInEmail = useRef<HTMLInputElement>(null);
    const signInPassword = useRef<HTMLInputElement>(null);

    // input form signup
    const signUpnickname = useRef<HTMLInputElement>(null);
    const signUpEmail = useRef<HTMLInputElement>(null);
    const signUpPassword = useRef<HTMLInputElement>(null);  

    const state = useUserStore();
    
    const login = useUserStore(state => state.login);
    const register = useUserStore(state => state.register);
    const refresh = useUserStore(state => state.refresh);
    
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = signInEmail.current?.value ?? '';
        const password = signInPassword.current?.value ?? '';
        if(email.length == 0 || password.length == 0) {
            toast.info('Se debe completar el password o el email');
            return;
        }
        
        setIsPosting(prev => ({...prev, isLogin: true }));

        const isValid = await login(email, password);

        if(isValid){
            console.log('redireccionando al home');
            navigate('/admin');
            return;
        }

        setIsPosting({isRegister: false, isLogin: false });
        toast.warning('Vuelva a intentar más tarde');
    }

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const nickname = signUpnickname.current?.value ?? '';
        const email = signUpEmail.current?.value ?? '';
        const password = signUpPassword.current?.value ?? '';

        if(email.length == 0 || password.length == 0) {
            toast.info('Se debe completar el password o el email');
            return;
        }

        setIsPosting(prev => ({...prev, isRegister: true}));
        
        const isValid = await register(nickname, email, password);

        if(isValid){
            console.log('redireccionando al home');
            navigate('/admin');
            return;
        }
        
        setIsPosting({isRegister: false, isLogin: false });
        toast.warning('Vuelva a intentar más tarde');
    }

    const handleRevalidateBearer = async ():Promise<void> => {
        await refresh();
    }

    return {
        //values
        isPosting,
        state,
        signInEmail,
        signInPassword,
        signUpEmail,
        signUpPassword,
        signUpnickname,
        hasBearer: 

        //methods
        setIsPosting,
        handleSignIn,
        handleSignUp,
        handleRevalidateBearer
    }
}
