import { useState } from "react";
import clsx from "clsx";
import { LayoutWithPreviews } from "../Layout/LayoutWithPreviews";
import { DashboardTabLink } from "../components/DashboardTabLink";
import { DashboardTabProject } from "../components/DashboardTabProject";
import type { Tab } from "../types/dashboard";

export const Dashboard = () => {

  const [tabSelected, setTabSelected] = useState<Tab>("link");

  return (
    <LayoutWithPreviews>

      <div className="flex flex-row justify-start gap-2">
          <button 
            className={clsx("cursor-pointer text-md font-normal tracking-tight mb-4 px-5 py-1 rounded-xl", {
              "bg-purple-600 text-white": tabSelected === "link",
              "bg-neutral-200": tabSelected != "link"
            })}
            onClick={()=> setTabSelected("link")}>Links</button>
          <button 
            className={clsx("cursor-pointer text-md font-normal tracking-tight mb-4 px-5 py-1 rounded-xl", {
              "bg-purple-600 text-white": tabSelected === "project",
              "bg-neutral-200": tabSelected != "project"
            })}
            onClick={()=> setTabSelected("project")}>Projects</button>
      </div>
      <div className="border border-dashed mb-4"></div>

      {/* content page */}

      <DashboardTabLink selected={tabSelected}/>
      
      <DashboardTabProject selected={tabSelected}/>

    </LayoutWithPreviews>
  );
};
