import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SidebarComponent } from '../components/Sidebar'
import { Outlet } from 'react-router'
import { useLocation } from 'react-router';

export const Layout = () => {
    
    const location = useLocation();
    const hasPreview = ["dashboard", "profile", "theme", "wallpaper", "style"].some(item => location.pathname.includes(item));    
    
    const view = location.pathname.split("/")[2];
     
    return (
        <SidebarProvider>
            <SidebarComponent />
            <main className="flex flex-1 flex-col gap-0 p-4 pt-0">
                <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1 cursor-pointer" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Abouteme</span>
                            <span>›</span>
                        <span>{view}</span>
                    </div>
                </div>
                </header>
                <div className={`flex flex-1 ${hasPreview ? 'gap-4' : ''}`}>
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
