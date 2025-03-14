import { Home, Settings } from "lucide-react";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";

export function SideBarContent() {
    return (
        <nav className="flex flex-col gap-3 pt-25">

            <Link
                href="/"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <Home className="w-5 h-5" />
                <span>Home</span>
            </Link>
            <Link
                href="/settings"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
            </Link>
        </nav>
    );
}
