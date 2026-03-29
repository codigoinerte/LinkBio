import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label"

import { Logo } from "../components"
import { Link } from "react-router"
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react"
import { useLogin } from "../hooks/useLogin"
import { useCheckNickname } from "@/hooks/useCheckNickname"
import { GoogleButtonLogin } from "../components/GoogleButtonLogin"
import { FacebookButtonLogin } from "../components/FacebookButtonLogin"

export const Login = () => {

  
  const {
        //values
        isPosting,
        signInEmail,
        signInPassword,
        signUpEmail,
        signUpPassword,
        signUpnickname,

        //methods
        handleSignIn,
        handleSignUp,

  } = useLogin();

  const { isCheckNickname,
          isValidNickName, 
          isValidNickNameSubmit, 
          validateNickName,
          resetValidNicknameSubmit } = useCheckNickname({ inputRef: signUpnickname });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md bg-white border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            <Link to={"/"}>
                <Logo className="justify-center"/>
            </Link>
          </CardTitle>          
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="login" disabled={isPosting.isLogin || isPosting.isRegister}>Sign In</TabsTrigger>
              <TabsTrigger value="signup" disabled={isPosting.isLogin || isPosting.isRegister}>Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="mb-1 inline-block">Email</Label>
                  <Input 
                    ref={signInEmail}
                    className="border-1 border-neutral-300 outline-none focus-visible:ring-gray-300" 
                    id="login-email" 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    autoComplete="false"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="mb-1 inline-block">Password</Label>
                  <Input
                    ref={signInPassword}
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="border-1 border-neutral-300 focus-visible:ring-gray-100" 
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-black text-white cursor-pointer"
                  disabled={isPosting.isLogin}>
                    
                    {isPosting.isLogin && <LoaderCircle className="animate-spin"/>}

                    Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="space-y-2">
                  <Label htmlFor="signup-nickname" className="mb-1 inline-block">Nickname</Label>
                  <div className="flex w-full items-center gap-2 flex-1">                    
                    <Input 
                      ref={signUpnickname}
                      id="signup-nickname" 
                      name="nickname" 
                      type="text" 
                      placeholder="Choose a nickname" 
                      className="border-1 border-neutral-300 focus-visible:ring-gray-100 flex-1 w-full"
                      disabled={isCheckNickname}
                      onKeyDown={resetValidNicknameSubmit}
                      required />
                    <Button type="button" variant="outline" onClick={validateNickName} disabled={isCheckNickname}>
                      {isCheckNickname && <LoaderCircle className="animate-spin"/>}
                      {isValidNickName === true &&  <CircleCheck className="text-green-600"/>}
                      {isValidNickName === false && <CircleX className="text-red-600"/>}
                      Check
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="mb-1 inline-block">Email</Label>
                  <Input 
                    ref={signUpEmail}
                    id="signup-email" 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    className="border-1 border-neutral-300 focus-visible:ring-gray-100" 
                    required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="mb-1 inline-block">Password</Label>
                  <Input
                    ref={signUpPassword}
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password (min. 6 characters)"
                    className="border-1 border-neutral-300 focus-visible:ring-gray-100" 
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-black text-white cursor-pointer"
                  disabled={isPosting.isRegister || !isValidNickNameSubmit}>                    
                    {isPosting.isRegister && <LoaderCircle className="animate-spin"/>}
                    Create Account                  
                </Button>
              </form>
            </TabsContent>

            <div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-300 mb-5 mt-2">
                    <span className="relative z-10 bg-white px-2 text-gray-600">Or continue with</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* <Button variant="outline" className="w-full cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                          fill="currentColor"
                          />
                      </svg>
                      <span className="sr-only">Login with Apple</span>
                    </Button> */}
                    <GoogleButtonLogin />
                    <FacebookButtonLogin />
                </div>
            </div>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
