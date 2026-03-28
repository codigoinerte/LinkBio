import type { CardLinkProps } from "../types/card.link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, CornerDownRight, MousePointerClick, PersonStanding, ExternalLink, Trash2 } from "lucide-react"
import * as Icon from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import type { LinkDashboard } from "../types/dashboard"
import DynamicIcon from "@/components/custom/DynamicIcon"
import { useState } from "react"


export const CardLink: React.FC<CardLinkProps & LinkDashboard> = ({    
    id,
    title,
    url,    
    clicks,
    visitors,
    children,
    category_icon,
    is_enabled,
    onSetEdit,
    onDelete,
    onChangeChecked}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Card className="gap-0 p-0 select-none">
            <div className="flex flex-row">
                {children}
                <div className="p-4 ps-2 flex-1 flex flex-row gap-4">
                    <div className="w-[35px] h-[35px] border border-gray-500 flex items-center justify-center rounded-full ">
                        {/* <Youtube className="text-gray-600 self-center" size={18} /> */}
                        <DynamicIcon 
                            name={category_icon as keyof typeof Icon}
                            className="text-gray-600 self-center" 
                            size={18}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{title}</span>
                            <Edit 
                                className="w-4 h-4 text-gray-400 cursor-pointer" 
                                size={16}
                                onClick={()=> onSetEdit(id)}/>
                        </div>
                        <div className="flex items-center gap-2">
                            <CornerDownRight className="w-4 h-4 text-gray-400 ms-2"/>
                            <span className="text-[13px] text-gray-600">{url}</span>
                            <Edit 
                                className="w-4 h-4 text-gray-400 cursor-pointer" 
                                onClick={()=> onSetEdit(id)}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Switch 
                            className="data-[state=checked]:bg-green-500 cursor-pointer"
                            checked={!!is_enabled}
                            disabled={isLoading}
                            onCheckedChange={async (checked:boolean)=> {
                                setIsLoading(true);
                                await onChangeChecked(id, checked);
                                setIsLoading(false);
                            }} />
                    </div>
                </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-xs">
                        <MousePointerClick className="w-3 h-3 mr-1" />{clicks} clicks
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                        <PersonStanding className="w-3 h-3 mr-1" />{visitors} visitors
                    </Badge>
                                            
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 cursor-pointer"
                        onClick={()=>{
                            if(url) window.open(url, "_blank");
                        }}>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">                                
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 cursor-pointer"
                        onClick={async ()=> {                            
                           await onDelete(id); 
                        }}>
                        <Trash2 className="w-4 h-4 text-gray-400" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}
