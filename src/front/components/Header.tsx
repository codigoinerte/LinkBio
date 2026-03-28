import { Link } from "react-router"
import { Logo } from "./Logo"
import { useUserStore } from "@/context/userContext"
import { DropdownAuth } from "./DropdownAuth";

export const Header = () => {
  
  const state = useUserStore(state => state.state);
  
  return (
      <nav className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo />
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {
                state === "auth" ?
                (
                  <DropdownAuth />
                ):
                (
                  <>
                    <Link to={"/auth"}>
                        <button className="bg-indigo-700 hover:bg-indigo-900 text-white px-6 py-2 rounded-full font-medium transition-colors cursor-pointer">
                            Try Free
                        </button>
                    </Link>                  
                  </> 
                )
              }
            </div>

          </div>

        </div>
      </nav>
  )
}
