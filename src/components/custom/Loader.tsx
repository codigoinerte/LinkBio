import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Props {
    isLoading: boolean;
}
export const Loader = ({ isLoading }:Props) => {
    if(isLoading)
        return (
            <div className="bg-white/80 fixed top-0 left-0 right-0 bottom-0 z-9999 flex items-center justify-center">
                <div className='w-50 h-50'>
                    <DotLottieReact
                        src="/assets/lotties/link-connect.lottie"
                        loop
                        autoplay
                    />                
                </div>
            </div>
        )
}
