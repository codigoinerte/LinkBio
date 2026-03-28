import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useUserStore } from "@/context/userContext";
import { routes } from "@/helpers/routes-list";

import { Menu } from "lucide-react";
import { useNavigate } from "react-router";

export const DropdownAuth = () => {
    const logout = useUserStore(state => state.logout);
    const user = useUserStore(state => state.user);

    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                
                
                    <div className="flex flex-row gap-2 cursor-pointer">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        
                        <Menu className="ml-auto size-4 self-center"/>
                    </div>
                
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" onClick={()=> navigate(routes.admin) }>
                            Dashboard
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={()=> navigate(routes.profile)}>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={()=> navigate(routes.settings)}>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        
                    </DropdownMenuGroup>                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>                    
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
