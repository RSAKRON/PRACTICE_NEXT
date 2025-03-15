"use client";
import React from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
// import AppSidebar from "./app-sidebar";
// import { useSession } from "@/hooks/use-session";
import Loading from "@/app/loading";
// import { SidebarProvider } from "../ui/sidebar";
import { publicURL } from "@/lib/routes";
import Header from "./app-header";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBarContent } from "@/components/ui/sidebarContent";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicURL = publicURL.includes(pathname);
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
                <Sidebar className="pt-14 bg-card dark:border-none">
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