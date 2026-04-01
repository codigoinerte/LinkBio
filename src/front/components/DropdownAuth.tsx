import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useUserStore } from "@/context/userContext";
import { routes } from "@/helpers/routes-list";

import { Menu } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export const DropdownAuth = () => {
    const logout = useUserStore(state => state.logout);
    const user = useUserStore(state => state.user);

    const navigate = useNavigate();

    const initials = useMemo(()=> {
        if(user?.name){
            return user.name.split(" ").map(word => word[0]).join("");
        }
        return "CM";        
    }, [user?.name])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                
                
                    <div className="flex flex-row gap-2 cursor-pointer">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user?.photo ?? ""} alt={user?.name} />
                            <AvatarFallback className="rounded-lg">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        
                        <Menu className="ml-auto size-4 self-center"/>
                    </div>
                
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" onClick={()=> navigate(routes.admin) }>
                            Dashboard
                            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={()=> navigate(routes.profile)}>
                            Profile
                            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={()=> navigate(routes.settings)}>
                            Design
                            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                        
                    </DropdownMenuGroup>                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>                    
                    Log out
                    {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
