import { useState, type PropsWithChildren } from 'react';
import { CornerDownRight, Edit, ExternalLink, Folder, MousePointerClick, PersonStanding, Trash2 } from 'lucide-react';

import type { ProjectDashboard } from '../types/dashboard'
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props extends PropsWithChildren{
    onDelete: (id:number) => Promise<void>;
    onChangeChecked: (id: number, is_enabled: boolean) => Promise<void>;
    onSetEdit: (id:number) => void;
}

export const CardProject:React.FC<Props & ProjectDashboard> = ({
    id,
    name,
    click,
    visits,
    is_enabled,
    link,
    description,
    short_description,
    onDelete,
    onSetEdit,
    onChangeChecked,
    children
}) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Card className="gap-0 p-0 select-none">
            <div className="flex flex-row">
                {children}
                <div className="p-4 ps-2 flex-1 min-w-0 flex flex-row gap-4">
                    <div className="w-8.75 h-8.75 border border-gray-500 flex items-center justify-center rounded-full ">
                        <Folder className="text-gray-600 self-center" size={18} />                        
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{name}</span>
                            <Edit 
                                className="w-4 h-4 text-gray-400 cursor-pointer" 
                                size={16}
                                onClick={()=> onSetEdit(id)}/>
                        </div>
                        <div className='w-full min-w-0'>
                            <p className='line-clamp-1 text-gray-400 text-[12px] mb-1.5'>
                            {
                                (short_description || description) &&  short_description || description
                            }
                            </p>

                        </div>
                        <div className="flex items-center gap-2">
                            <CornerDownRight className="w-4 h-4 text-gray-400 ms-2"/>
                            <span className="text-[13px] text-gray-600">{link}</span>
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
                        <MousePointerClick className="w-3 h-3 mr-1" />{click} clicks
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                        <PersonStanding className="w-3 h-3 mr-1" />{visits} visitors
                    </Badge>

                    {
                        link && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="p-2 cursor-pointer"
                                onClick={()=>{
                                    window.open(link, "_blank");
                                }}>
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                            </Button>
                        )
                    }
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
