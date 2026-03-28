import { Suspense, useMemo } from 'react';
import { Navigate, useParams } from 'react-router'
import { LandingProfile } from '../components/LandingProfile';
import { landing } from '../actions/landing.action';

export const Landing = () => {
    const {slug} = useParams();

    const landingPromise = useMemo(
        () => slug ? landing.getLanding(slug) : null,
        [slug]
    );

    if(!slug) return <Navigate to="/" />;

    return (
        <Suspense fallback={
                <div className='bg-gradient flex flex-col'>
                    <h1 className='text-white font-thin text-2xl'>Cargando</h1>
                </div>
                }>
            <LandingProfile promise={landingPromise!}/>
        </Suspense>
    )
}
