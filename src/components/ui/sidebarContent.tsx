import { Home, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import paths from "@/lib/mainRoutes";
import { redirect } from "next/navigation";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from "./sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";

export function SideBarContent() {
  const { setOpen, state } = useSidebar();
  return (
    <>
      <SidebarContent className="gap-0" onMouseEnter={() => { setOpen(true); }} onMouseLeave={()=>{ setOpen(false)}}>
        {paths.map(path => {
          return path.subPaths ?
            <SidebarGroup key={path.pathId} className="w-full">
              <Accordion type="single" collapsible>
                <AccordionItem  onClick={()=>{redirect(path.path)}} value="item-1">
                  <AccordionTrigger className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <path.icon className="h-5 w-5" /> {state == "expanded" && <span>{path.name}</span>}
                  </AccordionTrigger>

                  <AccordionContent className="pl-6">
                    {path.subPaths.map((subPath) =>
                      <SidebarGroup
                        key={subPath.subPathId}
                        onClick={(e) => { e.preventDefault(); redirect(subPath.path) }}
                        className=" animate-accordian-down transition-all flex flex-row p-2 gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <subPath.icon className="h-5 w-5" />
                        {state == "expanded" && <span>{subPath.name}</span>}
                      </SidebarGroup>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SidebarGroup>
            :
            <SidebarGroup key={path.pathId}>
            <Accordion type="single" collapsible>
              <AccordionItem value={path.path}>
                <AccordionTrigger className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`} onClick={() => { redirect(path.path) }} key={path.pathId}>
                  <path.icon className="h-5 w-5" />
                  {state == "expanded" && <span>{path.name}</span>}
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
            </SidebarGroup>
        })}
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="/settings"
          onClick={(e) => { e.preventDefault(); redirect("/settings") }}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut className="w-5 h-5" />
          {state == "expanded" && <span>Logout</span>}
        </Link>
      </SidebarFooter>
    </>
  );
}