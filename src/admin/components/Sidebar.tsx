import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { useUserStore } from "@/context/userContext"
import { Logo } from "@/front/components"
import { routes } from "@/helpers/routes-list"

import { SwatchBook,  
  LayoutTemplate,
  ChevronRight,
  LogOut,
  User } from "lucide-react"
import { use } from "react"
import { Link, useNavigate } from "react-router"


const data = {
  navMain: [
    {
      title: "Panel",
      url: "#",
      icon: LayoutTemplate,
      open: true,
      items: [
        {
          title: "Dashboard",
          url: routes.dashboard,
        }
      ],
    },
    {
      title: "Design",
      url: "#",
      icon: SwatchBook,
      open: true,
      items: [
        {
          title: "Profile",
          url: "design/profile",
        },
        {
          title: "Theme",
          url: "design/theme",
        },
        {
          title: "Wallpaper",
          url: "design/wallpaper",
        }
      ],
    }
  ]
}

export const SidebarComponent = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);

    const getInitials = ():string => {
      if(user?.name) return user?.name.slice(0,2).toUpperCase();
      return user?.email.slice(0,2).toUpperCase() ?? 'ME';
    }

    const sidebarContext = use(SidebarContext);
    const open = sidebarContext?.open ?? false;

    const navigate = useNavigate();
    
    return (
        <>
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                      <SidebarMenuItem className={`transition-transform duration-200 ${open == false ? '' : 'px-2'}`}>
                        <Link to={'/'}>
                          <Logo 
                            TextClassName={`text-sm leading-tight transition-transform duration-200 ${open == false ? 'hidden' : ''}`} 
                            IconContentClassName="p-2" 
                            IConClassName="h-4 w-4"/>
                        </Link>
                      </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                      <SidebarMenu>
                          {data.navMain.map((item) => (
                          <Collapsible key={item.title} asChild defaultOpen={item.open} open={true} className="group/collapsible">
                              <SidebarMenuItem>
                              <CollapsibleTrigger asChild>
                                  <SidebarMenuButton tooltip={item.title}>
                                  {item.icon && <item.icon />}
                                  <span>{item.title}</span>
                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                  </SidebarMenuButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                  <SidebarMenuSub>
                                  {item.items?.map((subItem) => (
                                      <SidebarMenuSubItem key={subItem.title}>
                                          <SidebarMenuSubButton asChild>
                                              <Link to={subItem.url}>
                                                  <span>{subItem.title}</span>
                                              </Link>
                                          </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                  ))}
                                  </SidebarMenuSub>
                              </CollapsibleContent>
                              </SidebarMenuItem>
                          </Collapsible>
                          ))}
                      </SidebarMenu>
                    </SidebarGroup>                    
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <SidebarMenuButton
                              size="lg"
                              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              >
                              <Avatar className="h-8 w-8 rounded-lg">                                  
                                  <AvatarFallback className="rounded-lg">{getInitials()}</AvatarFallback>
                              </Avatar>
                              <div className="grid flex-1 text-left text-sm leading-tight">
                                  <span className="truncate font-semibold">{user?.name}</span>
                                  <span className="truncate text-xs">{user?.email}</span>
                              </div>
                              <ChevronRight className="ml-auto size-4" />
                              </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                              side="top"
                              align="start"
                              sideOffset={4}
                          >
                              <DropdownMenuLabel className="p-0 font-normal">
                              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                  <Avatar className="h-8 w-8 rounded-lg">
                                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                                      <AvatarFallback className="rounded-lg">{getInitials()}</AvatarFallback>
                                  </Avatar>
                                  <div className="grid flex-1 text-left text-sm leading-tight">
                                      <span className="truncate font-semibold">{user?.name}</span>
                                      <span className="truncate text-xs">{user?.email}</span>
                                  </div>
                              </div>
                              </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={()=> navigate(routes.account)}>
                                        <User />
                                        Account
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}
