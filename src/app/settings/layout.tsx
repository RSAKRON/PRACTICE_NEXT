import {paths} from "@/lib/settingsRoutes";
import Navbar from "@/components/ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex box-border flex-col w-full">
      <Navbar paths={paths} strictCheck={true}/>
      {children}
      </div>
    </div>
  );
}
