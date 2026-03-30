
import { Navigate } from "react-router";
import { useUserStore } from "@/context/userContext";
import { useLogin } from "@/front/hooks/useLogin";
import { useQuery } from "@tanstack/react-query";

interface Props {
    element: React.JSX.Element;
}

export const PrivateRouter: React.FC<Props> = ({ element }) => {
    const isAuth = useUserStore((state) => state.state) === "auth";
    const hasBearer = !!useUserStore((state) => state.token);
    const { handleRevalidateBearer } = useLogin();


    const { isLoading } = useQuery({ 
        queryKey: ['auth-revalidate'], 
        queryFn: async ()=> {
           return await handleRevalidateBearer();
        },        
        staleTime: 1000 * 60 * 55
    });

    if(!hasBearer){
        return <Navigate to="/auth" />;
    }

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isAuth) {
        return element;
    }
    
    return <Navigate to="/" />;
};
