"use client";
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import { Menu, Menu as MenuIcon } from 'lucide-react';
import { CircleUser as AccountCircleIcon } from 'lucide-react';
import { Moon as ThemeIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import paths from '@/lib/mainRoutes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/ui/custom-sidebar';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const pathName = usePathname();

    useEffect(() => {
        console.log(pathName);
    }, [])
    return (
        <div className="flex fixed top-0 z-10 w-full min-h-14 max-h-max items-center p-4 bg-card border-b-2 box-border">
            <div className="flex w-max h-full items-center gap-1">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="p-2">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-4">
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex w-max h-full gap-1">School</div>
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