
import { useUserStore } from "@/context/userContext";
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({children}: PropsWithChildren) => {

    const { state } = useUserStore();

    if(state === 'checking') return null;

    if(state === 'no-auth') return <Navigate to="/auth" />

    return children;
}

export const NoAuthenticatedRoute = ({children}: PropsWithChildren) => {

    const { state } = useUserStore();

    if(state === 'checking') return null;

    if(state === 'auth') return <Navigate to="/" />

    return children;
}

export const AdminRoute = ({children}: PropsWithChildren) => {

    const { state } = useUserStore(); //isAdmin

    if(state === 'checking') return null;

    if(state === 'no-auth') return <Navigate to="/auth" />

    // if(!isAdmin()) return <Navigate to="/" />

    return children;
}
