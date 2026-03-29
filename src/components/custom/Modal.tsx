import { useEffect, type PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren{
    title: string,
    show: boolean,
    showCloseButton?: boolean,
    disableButtons?:boolean,
    onSubmitMessage?:string,
    classNameSubmit?:string,
    onClose: () => void,
    onSubmit?: () => Promise<void>,
}
export const Modal:React.FC<Props> = ({
    title,
    show = false,
    children,
    showCloseButton = false,
    disableButtons = false,
    onSubmitMessage = "Save",
    classNameSubmit,
    onClose,
    onSubmit
}) => {

    useEffect(() => {
        
        if(!document.querySelector("body")) return;
        document.querySelector("body")!.style.overflow = show ? "hidden" : "auto";        

    }, [show])
    
    if(!show) return <></>;

    return (
        <div 
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full max-h-full bg-gray-950/75 items-center justify-center"
            style={{ 
                display: show ? 'flex' : "none"
            }}
            >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                
                <div className="fade-in-100 ease-in-out relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6 bg-white rounded-lg">
                    
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-heading">
                            {title}
                        </h3>
                        <button 
                            type="button" 
                            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center cursor-pointer"
                            onClick={onClose}>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    {children}
                    
                    {
                        !disableButtons && (
                            <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                                {
                                    showCloseButton &&
                                    (
                                        <button 
                                            type="button" 
                                            className="text-stone-700 bg-brand box-border hover:bg-brand-strong focus:ring-0 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none border border-stone-500 rounded-base rounded-3xl flex-1 cursor-pointer"
                                            onClick={onClose}>Cancel</button>

                                    )
                                }
                                <button 
                                    type="button" 
                                    className={twMerge("text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none bg-purple-600 rounded-3xl flex-1 w-full text-white cursor-pointer", classNameSubmit)}
                                    onClick={onSubmit}>{onSubmitMessage}</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
