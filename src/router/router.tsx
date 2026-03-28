import { Home, Login } from "@/front/pages";
import { Account, Dashboard, Design, Profile } from "@/admin/pages";

import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "@/admin/Layout/Layout";
import { AdminRoute, NoAuthenticatedRoute } from "./protectedRoutes";
import { Landing } from "@/front/pages/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth",
    element:  <NoAuthenticatedRoute><Login /></NoAuthenticatedRoute>, //<PublicRouter element={<Login />} />
  },
  {
    path: "/admin/",
    element: <AdminRoute><Layout /></AdminRoute>, //<PrivateRouter element={<Layout />} />,
    children: [
      { element: <Account />, path: "account" },
      { element: <Dashboard />, path: "" , index: true },
      { element: <Dashboard />, path: "dashboard" },
      { element: <Design />, path: "design" },
      { element: <Design />, path: "design/:section" },
      { element: <Profile /> ,path: "profile" },
      { element: <Navigate to={"/admin/"} />, path:"*" }
    ]  
  },
  {
    path:"/:slug",
    element: <Landing/>
    // element: <Navigate to={"/"} />
  }
]);