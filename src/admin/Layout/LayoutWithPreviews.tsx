import type { PropsWithChildren } from "react"
import { Preview } from "../components/Preview"

export const LayoutWithPreviews = ({children}:PropsWithChildren) => {
  return (
    <>
        <div className="flex flex-col flex-1 rounded-lg border border-dashed shadow-sm p-4">
            {children}
        </div>
        <div className="flex-1 rounded-lg border border-dashed shadow-sm p-4 max-w-[35%] justify-center items-center bg-sidebar relative hidden md:min-lg:inline">
            <Preview />
        </div>
    </>
  )
}
