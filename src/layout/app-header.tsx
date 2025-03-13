"use client";
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import { Menu as MenuIcon } from 'lucide-react';
import { CircleUser as AccountCircleIcon } from 'lucide-react';
import { Moon as ThemeIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import paths from '@/lib/mainRoutes';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const pathName = usePathname();

    useEffect(() => {
        console.log(pathName);
    }, [])
    return (
        <div className="flex fixed top-0 z-10 w-full min-h-14 max-h-max items-center p-4 bg-card border-b-2 box-border">
            <div className="flex w-max m-auto h-full items-center gap-1">
                <MenuIcon /> School
            </div>
            <Navbar paths={paths} strictCheck={false} />
            <div className="flex self-end gap-2 m-auto w-max h-full justify-end items-center box-border p-4">
                <ThemeIcon className='cursor-pointer' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
                <AccountCircleIcon /> <div className='sm:flex hidden'>Admin</div>
            </div>
        </div>
    )
}