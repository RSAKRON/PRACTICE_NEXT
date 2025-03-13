"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  path: string;
};

type NavbarProps = {
  paths: NavItem[];
  strictCheck?: boolean;
};

export default function Navbar({ paths, strictCheck }: NavbarProps) {
  const pathName = usePathname();

  return (
    <div className="flex gap-1 w-max justify-center items-center">
      {paths.map(({ name, path }) => (
        <div key={path} className="flex justify-center items-center">
          <Link
            className={`p-4 ${(strictCheck ? (path === pathName):(pathName.includes(path))) ? "border-b-2 border-y-sidebar-accent-foreground" : ""}`}
            href={path}
          >
            {name}
          </Link>
        </div>
      ))}
    </div>
  );
}
