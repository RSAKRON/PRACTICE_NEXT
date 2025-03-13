"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useTheme, ThemeProvider as NextThemeProvider } from "next-themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { createContext, useContext, useEffect, useState } from "react";

export interface ThemeProps {
    toggleTheme: () => void;
    currentTheme: string;
}

export const ThemeContext = createContext<ThemeProps | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState('light');
    const isMounted = useMounted();
    const { setTheme } = useTheme();

    const toggleTheme = () => {
        localStorage.setItem('apptheme', currentTheme === 'light'? 'dark': 'light')
        setCurrentTheme((prev)=> prev === 'light' ? 'dark': 'light');
        setTheme((prev) => prev === 'light' ? 'dark' : 'light');
    }

    useEffect(()=>{
        const themeLocalStorage = localStorage.getItem('apptheme');
        if (themeLocalStorage) {setCurrentTheme(themeLocalStorage); setTheme(themeLocalStorage) }
    }, [isMounted])

    return (
        <ThemeContext.Provider value={{ toggleTheme, currentTheme }}>
            <NextThemeProvider
            attribute="class"
            defaultTheme={"light"}
            enableSystem
            >
                {
                    isMounted &&
                    <>
                        {children}
                        <ProgressBar
                        height="4px"
                        color="rgb(26 139 244)"
                        options={{ showSpinner: false }}
                        shallowRouting
                        />
                    </>
                }
            </NextThemeProvider>
        </ThemeContext.Provider>
    )
}


export default ThemeProvider;