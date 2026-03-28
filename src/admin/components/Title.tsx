import type { TitleProps } from "../types/component.title"

export const Title = ({title, children }:TitleProps) => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <h1 className="text-xl font-bold tracking-tight mb-4">{title}</h1>
                {children}
            </div>
            <div className="border border-dashed mb-4"></div>
        </>
    )
}
