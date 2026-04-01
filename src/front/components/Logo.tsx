import { cn } from "@/lib/utils"
import { LinkIcon } from "lucide-react"

interface Props {
    className?: string | undefined,
    IconContentClassName?: string | undefined,
    IConClassName?: string | undefined,
    TextClassName?: string | undefined,
}
export const Logo: React.FC<Props> = ({className = '', IconContentClassName = '', IConClassName = '', TextClassName = ''}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
        <div className={cn(`w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center`, IconContentClassName)}>
            <LinkIcon className={cn(`w-5 h-5`, IConClassName)} color="#fff" />
        </div>
        <span className={cn(`text-xl font-semibold text-black`, TextClassName)}>Aboutme</span>
    </div>
  )
}
