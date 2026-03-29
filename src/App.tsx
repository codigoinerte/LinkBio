
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import { Toaster } from 'sonner';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react';
import { useUserStore } from './context/userContext';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient()

const CheckAuthProvider = ({children}:PropsWithChildren) => {
  
    const checkAuhStatus = useUserStore(state => state.check);

    const { isLoading } =   useQuery({
                            queryKey: ['auth'],
                            queryFn: checkAuhStatus,
                            retry: false,
                            refetchInterval: 1000 * 60 * 60,
                          });
    if(isLoading) return <CustomFullScreenLoading />;

    return children;
}

const App = () => { 
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <CheckAuthProvider>
            <RouterProvider router={router} />
          </CheckAuthProvider>
        </QueryClientProvider>
        <Toaster position="top-right" expand={true}/>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
