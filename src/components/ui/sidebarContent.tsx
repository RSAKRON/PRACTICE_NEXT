import { Home, Settings } from "lucide-react";
import Link from "next/link";
import paths from "@/lib/mainRoutes";
import { redirect } from "next/navigation";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";

export function SideBarContent() {
    return (
        <>
            <SidebarContent>
                {paths.map(path => {
                    return path.subPaths ?
                        <SidebarGroup key={path.pathId} className="w-full">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="flex items-center gap-2 w-full p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <path.icon className="h-5 w-5" /> {path.name}
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-6">
                                        {path.subPaths.map((subPath) =>
                                            <Link
                                                key={subPath.subPathId}
                                                href={subPath.path}
                                                onClick={(e) => { e.preventDefault(); redirect(subPath.path) }}
                                                className=" animate-accordian-down transition-all flex items-center p-2 gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <subPath.icon className="h-5 w-5" />
                                                <span>{subPath.name}</span>
                                            </Link>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </SidebarGroup>
                        :
                        <SidebarGroup key={path.pathId}>
                            <Link
                                href={path.path}
                                onClick={(e) => { e.preventDefault(); redirect("/home") }}
                                className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <path.icon className="h-5 w-5" />
                                <span>{path.name}</span>
                            </Link>
                        </SidebarGroup>
                })}
            </SidebarContent>
            <SidebarFooter>
                <Link
                    href="/settings"
                    onClick={(e) => { e.preventDefault(); redirect("/settings") }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <Settings className="w-5 h-5" />
                    <span>Logout</span>
                </Link>
            </SidebarFooter>
        </>
    );
}
