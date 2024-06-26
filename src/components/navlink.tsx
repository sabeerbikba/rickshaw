"use client";
import { ReactNode, FC } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
   urls: string[];
   children: ReactNode;
}

const matchesUrl = (pathname: string, urlPattern: string) => {
   if (urlPattern === pathname) return true;
   if (urlPattern.endsWith('/*')) {
      const basePattern = urlPattern.slice(0, -1);
      return pathname.startsWith(basePattern);
   }
   return false;
}

const NavLink: FC<NavLinkProps> = ({ urls, children }) => {
   const pathname = usePathname();
   return (
      <>
         {urls.some(urlPattern => matchesUrl(pathname, urlPattern)) && (
            <li className="nav-li">
               {children}
            </li>
         )}
      </>
   );
}

export default NavLink;
