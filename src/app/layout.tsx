import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/context/theme-provider";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/layout/app-layout";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  weight: "400",
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Webdesk",
  description: "Webdesk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cn(poppins.className)}`}>
        <ThemeProvider>
          <Theme>
            <AppLayout>
              <div className="m-0 pt-20"></div>
            {children}
            </AppLayout>
            <Toaster position="top-right"/>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
