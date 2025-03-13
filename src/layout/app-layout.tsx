"use client";
import React from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
// import AppSidebar from "./app-sidebar";
// import { useSession } from "@/hooks/use-session";
import Loading from "@/app/loading";
// import { SidebarProvider } from "../ui/sidebar";
import { publicURL } from "@/lib/routes";
import Header from "./app-header";

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
            <>
                <Header />
                {children}
            </>
        )
    }
}