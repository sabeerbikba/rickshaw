"use client";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { matchesUrl } from "@/utils/functions";

interface NavItem {
   urls: string[];
   href?: string;
   className?: string;
   id?: string;
   label?: string;
   component?: ReactNode;
}

const generateRelativePath = (pathname: string, targetPath: string) => {
   const depth = pathname.split('/').length - 1;
   const relativePrefix = './' + '../'.repeat(Math.max(0, depth - 1));
   return relativePrefix + targetPath.slice(2);
}

const NavLinks: FC = (): JSX.Element => {
   const pathname = usePathname();

   const navItems: NavItem[] = [
      { urls: ['/', '/gallery', '/gallery/*'], href: './about-me/', className: 'text-dec-none nav-a indicator', id: 'aboutme-a', label: 'About me' },
      { urls: ['/', '/about-me'], href: './gallery/', className: 'text-dec-none nav-a indicator gallery', id: 'gallery-a', label: 'Gallery' },
      { urls: ['/gallery', '/gallery/*'], component: <button className="nav-a upload-btn" id="upload-button">Upload</button> },
   ];

   return (
      <ul className="nav-ul">
         {navItems.map((item, index): JSX.Element | ReactNode  =>
            item.urls.some(urlPattern => matchesUrl(pathname, urlPattern)) && (
               <li className="nav-li" key={index}>
                  {item.href ? (
                     <a href={generateRelativePath(pathname, item.href)} className={item.className} id={item.id}>
                        {item.label}
                     </a>
                  ) : (
                     item.component
                  )}
               </li>
            )
         )}
      </ul>
   );
}

export default NavLinks;
