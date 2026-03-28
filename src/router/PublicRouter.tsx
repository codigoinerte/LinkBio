
import { useRef, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useUserStore } from "@/context/userContext";
import { useLogin } from "@/front/hooks/useLogin";

interface Props {
    element: React.ReactNode;
    redirectToDashboard?: boolean
}

export const PublicRouter: React.FC<Props> = ({ element, redirectToDashboard=true }) => {
    const isAuth = useUserStore((state) => state.isAuth);
    const { hasBearer, handleRevalidateBearer, state } = useLogin();
    const [loading, setLoading] = useState(true);
    const validated = useRef(false);

    useEffect(() => {
        let ignore = false;
        (async () => {
            // Solo revalidar si hay bearer y no hay usuario
            if (!validated.current && hasBearer && !state.user) {
                validated.current = true;
                await handleRevalidateBearer();
            }
            if (!ignore) setLoading(false);
        })();
        return () => {
            ignore = true;
        };
        // Solo depende de hasBearer y state.user
    }, [hasBearer, state.user, handleRevalidateBearer]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!isAuth && !hasBearer) {
        return element;
    }

    if (isAuth && redirectToDashboard) {
        return <Navigate to="/admin" />;
    }

    // Si no está autenticado pero hay bearer inválido
    return element;
};
