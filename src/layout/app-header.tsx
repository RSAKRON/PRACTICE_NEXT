"use client";
import Navbar from '@/components/ui/navbar';
import { CircleUser as AccountCircleIcon, Icon } from 'lucide-react';
import { Moon as ThemeIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import paths from '@/lib/mainRoutes';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';

const Header:React.FC<{children: React.ReactNode}> = ({children}) => {
    const { theme, setTheme } = useTheme();
    const { open } = useSidebar()
    const pathName = usePathname();
    return (
        <div className={`flex fixed top-0 z-10 w-full ${open ? "border-none" : ""} min-h-14 max-h-max items-center px-2 bg-card border-b-2 dark:border-none box-border`}>
            <div className="flex w-max h-full gap-1">
                {children}
            </div>
            <div className="flex w-max h-full justify-center items-center gap-1"><img src='/android-chrome-192x192.png' height="32px" width="32px" alt='logo'/>{open ? "Menu" : "WebDesk"}</div>
            <div className="sm:flex w-full m-auto justify-center items-center hidden">
            <Navbar paths={paths} strictCheck={false} />
            </div>
            <div className="flex self-end gap-2 m-auto w-full sm:w-max h-full justify-end items-center box-border p-4">
                <ThemeIcon className='cursor-pointer' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
                <AccountCircleIcon /> <div className='sm:flex hidden'>Admin</div>
            </div>
        </div>
    )
}

export default Header;