"use client";
import React, { useState } from "react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/app/loading";
import { publicURL } from "@/lib/routes";
import Header from "./app-header";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBarContent } from "@/components/ui/sidebarContent";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicURL = publicURL.includes(pathname);
    const [isCollapsed, setIsCollapsed] = useState(false);
    // const { session, isLoading } = useSession();

    // if (isLoading) {
    //     return <Loading />
    // }

    if (isPublicURL) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    if (pathname === "/" /* && session.isLoggedIn*/) {
        redirect('/home');
    }

    if (!isPublicURL /*&& session.isLoggedIn*/) {
        return (
            <SidebarProvider>
                <Sidebar collapsible="icon" className="pt-16 bg-card dark:border-none">
                    <SideBarContent />
                </Sidebar>
                <Header>
                    <SidebarTrigger />
                </Header>
                <main className="w-full px-2">
                    {children}
                </main>
            </SidebarProvider>

        )
    }
}